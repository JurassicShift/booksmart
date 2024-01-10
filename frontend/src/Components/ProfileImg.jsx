import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateToast } from '../redux/slices/toastSlice';
import { toastObjFactory } from '../helpers/indexHelpers';
import { resetUrl, updateUrl } from '../redux/slices/loginSlice';

const ProfileImg = () => {
	const [dataState, setDataState] = useState(null);
	const dispatch = useDispatch();

	const handlePhotoUpload = e => {
		e.preventDefault();
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
					dispatch(updateToast(toastObjFactory('warning', `Upload failed!`)));
				}
			})
			.then(data => {
				dispatch(updateUrl(data.obj.userimage.url));
				dispatch(updateToast(toastObjFactory('success', `Photo updated!`)));
				setDataState(null);
			})
			.catch(error => {
				dispatch(
					updateToast(toastObjFactory('warning', `Photo error ${error}!`))
				);
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
					dispatch(updateToast(toastObjFactory('success', `Photo deleted!`)));
				} else {
					dispatch(updateToast(toastObjFactory('warning', `Delete failed!`)));
				}
			})
			.catch(error => {
				dispatch(
					updateToast(toastObjFactory('warning', `Delete error ${error}..!`))
				);
			});
	};
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
					<button className=" base-btn-form-cropRight" type="submit">
						<i className="bi bi-upload profile__form-iconAdjust"></i>
						Upload
					</button>
				</div>
			</form>
			<form className="profile__main-flex" onSubmit={handlePhotoDelete}>
				<button
					className=" base-btn-form-cropLeft"
					type="submit"
				>
				
					<i className="bi bi-trash3 profile__form-icon"></i>
					Delete Image
				</button>
			</form>
		</>
	);
};

export default ProfileImg;
