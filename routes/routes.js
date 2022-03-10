import { accessToken } from "../middleware/access.midlleware.js"

export const routes=(app)=>{
   app.post('/api/token', accessToken, )
}