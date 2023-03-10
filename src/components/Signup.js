import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { postSignUp } from "../apiCalls";

const schema = yup.object({
    userName: yup.string().min(5).max(50).required(),
    email: yup.string().email().max(50),
    password: yup.string().min(8).max(16),
    passwordConfirmation: yup.string().min(8).max(16)
}).required();


const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onFinalSubmission = async (data) => {
        if (data.password != data.passwordConfirmation) {
            toast("passwords are not matching", {
                type: "error",
                theme: "colored"

            })
            return
        }
        try {
            const response = await postSignUp({
                name: data.userName,
                email: data.email,
                password: data.password
            });
            if (response.status == 200) {
                toast("you've regestered succesfully!Login now!", {
                    type: "success",
                    theme: "colored"
                })
                setTimeout(() => {
                    window.location.href = "/Login"
                }, 1000)

            }

        }
        catch (error) {
            console.log(error)
            const message = error?.response?.data?.message || "Something went wrong";
            toast(message, {
                type: "error",
                theme: "colored"
            })

        }
    }
    console.log("errors", errors)
    return (
        <div style={{

            display: 'flex',
            alignItems: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',

        }}>
            <div style={{ width: 500 }} >
                <form onSubmit={handleSubmit(onFinalSubmission)}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" type="text"{...register("userName")} />
                        <p className="text text-danger">{errors.username?.message}</p>
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input className="form-control" type="email"{...register("email")} />
                        <p className="text text-danger">{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password"{...register("password")} />
                        <p className="text text-danger">{errors.password?.message}</p>
                    </div>
                    <div className="form-group">
                        <label >Confirm Password</label>
                        <input className="form-control" type="password"{...register("passwordConfirmation")} />
                        <p className="text text-danger">{errors.passwordConfirmation?.message}</p>
                    </div>
                    < input type="submit" className="btn btn-primary" style={{ margin: 20 }} />
                </form>
                Already has an account?<a href="/login">Login</a>
            </div>
        </div>

    )
}

export default Signup;