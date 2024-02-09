import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetUrl, updateUrl } from '../redux/slices/loginSlice';
import {  useToast } from '../hooks/indexHooks.js';

const ProfileImg = () => {
	const [dataState, setDataState] = useState(null);
	const dispatch = useDispatch();
	const btnFocusRef = useRef();
	const callToast = useToast();

	const handlePhotoUpload = e => {
		e.preventDefault();
		btnFocusRef.current.blur();
		const formData = new FormData();
		formData.append('filename', dataState);
		const url = 'http://localhost:5000/photoupload';
	
		fetch(url, {
			method: 'POST',
			credentials: 'include',
			body: formData,
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					callToast('warning', `Upload failed!`);
					setDataState(null);
				}
			})
			.then(data => {
				dispatch(updateUrl(data.obj.userimage.url));
				callToast('success', `Photo updated!`);
				setDataState(null);
			})
			.catch(error => {
				callToast('warning', `Photo error ${error}!`);
				setDataState(null);
			});
	};

	const handlePhotoDelete = e => {
		e.preventDefault();
		const url = 'http://localhost:5000/photodelete';

		fetch(url, {
			method: 'DELETE',
			credentials: 'include',
		})
			.then(response => {
				if (response.ok) {
					dispatch(resetUrl());
					callToast('success', `Photo deleted!`);
				} else {
					callToast('warning', `Delete failed!`);
				}
			})
			.catch(error => {
				callToast('warning', `Delete error ${error}..!`);
			});
	};

	const handleRemoveFocus = () => {
		const timer = setTimeout(() => {
			btnFocusRef.current.blur();
			return clearTimeout(timer);
		}, 4000);
	};

	useEffect(() => {
		if (dataState) {
			const timer = setTimeout(() => {
				btnFocusRef.current.focus();
				return clearTimeout(timer);
			}, 500);
		}
	}, [btnFocusRef, dataState]);

	return (
		<>
			<form
				className="profile__form-img"
				onSubmit={handlePhotoUpload}
				encType="multipart/form-data"
			>
				<div className="profile__form-uploadSection">
					<label
						htmlFor="myFile"
						className="profile__form-uploadLabel base-btn-form-cropLeft"
					>
						<i className="bi bi-card-image profile__form-iconAdjust"></i>
						Image
						<input
							className="profile__text"
							type="file"
							id="myFile"
							name="filename"
							onChange={e => setDataState(e.target.files[0])}
							onClick={e => (e.target.value = '')}
						
						></input>
					</label>
					{dataState && (
						<>
							<div className="profile__form-uploadHide"></div>
							<i className="bi bi-file-check-fill profile__form-uploadIcon"></i>
						</>
					)}
				</div>
				<div className="profile__form-uploadSubmit">
					<button
						className="btn upload-focus base-btn-form-cropRight"
						type="submit"
						onFocus={handleRemoveFocus}
						ref={btnFocusRef}
					>
						<i className="bi bi-upload profile__form-iconAdjust"></i>
						Upload
					</button>
				</div>
			</form>
			<form className="profile__main-flex" onSubmit={handlePhotoDelete}>
				<button className=" base-btn-form-cropLeft" type="submit">
					<i className="bi bi-trash3 profile__form-icon"></i>
					Delete Image
				</button>
			</form>
		</>
	);
};

export default ProfileImg;
