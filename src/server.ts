import app from "./app"
import { prisma } from "./lib/prisma"

const PORT = process.env.PORT || 5000

async function  main() {

    try{
        
        await prisma.$connect()
        console.log("Database connected successfully")

        app.listen(PORT, () => {
            console.log(`server is run on port ${PORT}`)
        })

    }catch(error){
        console.error("an error occured", error)
        await prisma.$disconnect()
        process.exit(1)
    }

}

main()