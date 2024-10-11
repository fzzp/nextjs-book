"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addBookHandler, getOneBook, putBookHandler } from "@/app/api";
import { AddBookRequest } from "@/types/request";
import { useRouter } from "next/navigation";
import { fileUploadHanler, showPic } from "@/app/lib";

function Addbook() {
	// const pic = "http://localhost:8901/show/pic/ec56123500b0d8970428864455e9d9682c20dd7c3e5c0c2a74ac3ef2a9d8bf71"

	const [pic, setPic] = useState('')

	const query = useSearchParams()
	const bookid = query.get("bookid")

	const router = useRouter()


	console.log("bookid: ", bookid)

	useEffect(() => {
		if (bookid) {
			getOneBook(bookid).then(res => {
				if (res.status === 200) {
					const { data } = res
					const form = document.querySelectorAll('.needs-validation')[0] as any
					form.elements.title.value = data.title
					form.elements.author.value = data.author
					form.elements.price.value = data.price
					form.elements.description.value = data.description
					setPic(data.cover_pic)
				} else {
					alert(res.error)
				}
			})
		}
	}, [bookid])

	const changeUpload = (event: any) => {
		// console.log(event)
		const formData = new FormData();
		formData.append("imageFile", event.target.files[0])
		fileUploadHanler(formData).then(res => {
			console.log("upload res: ", res)
			if (res.status === 200) {
				setPic(res.filename)
			} else {
				alert("上传失败")
			}
		})
	}

	const submit = () => {
		let isValid = true
		const forms = document.querySelectorAll('.needs-validation')
		Array.from(forms).forEach((form: any) => {
			if (!form.checkValidity()) {
				isValid = false
			}
			form.classList.add('was-validated')
		})

		if (!isValid) {
			console.log("验证失败")
			return
		}
		// console.log("验证成功: ", forms[0])
		let form = forms[0] as any
		let req: AddBookRequest = {
			title: form.elements.title.value,
			author: form.elements.author.value,
			price: Number(form.elements.price.value),
			description: form.elements.description.value,
			cover_pic: pic
		}
		if (bookid) {
			putBookHandler(bookid, req).then(res => {
				alert(res.error)
				if (res.status == 200) {
					router.push("/admin/booklist")
				}
			})
		} else {
			addBookHandler(req).then(res => {
				alert(res.error)
				if (res.status == 200) {
					router.push("/admin/booklist")
				}
			})
		}
	}

	return (
		<div className="container">
			<div className="d-flex py-2 justify-content-between align-items-center">
				<h3 className="fs-4 py-3 text-secondary"> {bookid ? "编辑图书" : "添加图书"} </h3>
				<button className="btn btn-primary px-3" onClick={submit}>提交保存</button>
			</div>

			<form className="needs-validation" noValidate>
				<div className="row g-3">

					<div className="col-12">
						<label htmlFor="title" className="form-label">图书名称</label>
						<div className="input-group has-validation">
							<input type="text" className="form-control" name="title" id="title" placeholder="" required />
							<div className="invalid-feedback">
								请填写图书名称
							</div>
						</div>
					</div>

					<div className="col-12">
						<label htmlFor="author" className="form-label">图书作者</label>
						<input type="text" className="form-control" id="author" name="author" placeholder="" required />
						<div className="invalid-feedback">
							请填写图书作者
						</div>
					</div>

					<div className="col-12">
						<label htmlFor="price" className="form-label">图书价格</label>
						<input type="number" className="form-control" id="price" name="price" placeholder="" required />
						<div className="invalid-feedback">
							请填写图书价格
						</div>
					</div>

					<div className="col-12">
						<label htmlFor="cover_pic" className="form-label">上传封面</label>
						<input type="file" className="form-control" id="cover_pic" onChange={changeUpload} name="cover_pic"
							placeholder="" required={pic ? false : true} />
						<div className="invalid-feedback">
							请上传图书封面
						</div>
						{
							pic ? <div className="col mt-2">
								<img src={showPic(pic)} className="shadow-lg" width="160" height="160" alt="图书" />
							</div> : null
						}

					</div>

					<div className="col-12">
						<label htmlFor="description" className="form-label">图书详情</label>
						<textarea className="form-control" style={{ height: 200 }} id="description" name="description" placeholder="" required />
						<div className="invalid-feedback">
							请填写图书详情
						</div>
					</div>

				</div>
			</form>

		</div>
	)
}

export default Addbook