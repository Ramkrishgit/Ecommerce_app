
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { postLogin } from "../apiCalls";
import { toast } from 'react-toastify';

const schema = yup.object({
    email: yup.string().email().max(50),
    password: yup.string().min(8).max(16),
}).required();

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onFinalSubmission = async (data) => {
        try {
            const response = await postLogin({
                email: data.email,
                password: data.password
            })
            const cartID = response?.data?.cart_id;
            const token = response?.data?.token;

            localStorage.setItem("ECOMM_CART_ID", cartID)
            localStorage.setItem("ECOMM_TOKEN", token)

            toast("login Successful", {
                type: "success",
                theme: "colored"
            })

            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 2000)

        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast(message, {
                type: "error",
                theme: "colored"
            })
        }
        console.log("final data", data);
    }
    return (
        <div className="card" style={{
            display: 'flex',
            alignItems: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh'
        }}>
            <div style={{ width: 500, margin: 30, }}>
                <h1>Login form</h1>
                <form onSubmit={handleSubmit(onFinalSubmission)}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input className="form-control" type="email"{...register("email")} />
                        <p className="text text-danger">{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password"{...register("password")} />
                        <p className="text text-danger">{errors.password?.message}</p>
                    </div>
                    <input type="submit" className="btn btn-primary" style={{ margin: 20 }} />
                </form>
                Don't have an account? <a href="/signup">signup</a>
            </div >
        </div>
    )
}
export default Login;