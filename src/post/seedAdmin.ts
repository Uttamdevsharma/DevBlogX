import { prisma } from "../lib/prisma"
import { UserRole } from "../middleware/auth"


async function seedAdmin (){


    try {

        const adminData = {
            name : "admin",
            email : "admin@gamil.com",
            role : UserRole.ADMIN,
            password : "admin1234"
        }

        const existUser = await prisma.user.findUnique({
            where : {
                email : adminData.email
            }
        })

        if(existUser){
            throw new Error ("User Already Exists")

        }

        const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(adminData)
        })


        if(signUpAdmin.ok){
            await prisma.user.update({
                where : {
                    email : adminData.email
                },
                data:{
                    emailVerified : true
                }
            })
        }
        
    }catch(error){
        console.error(error)
    }

}

seedAdmin()