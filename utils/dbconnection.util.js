import mongoose from "mongoose"

export const connect = async() => {
   try {
       await mongoose.connect(process.env.DB_URI)
       console.info("connection to mongo databsse wa successfull")
   } catch (error) {
       console.error(`an error occured during connection: ${error}`)
   }
}