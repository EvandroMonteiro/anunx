import dbConnet from '../../src/utils/dbConnect'
import { crypto } from '../../src/utils/password'
import UsersModel from '../../src/models/users'

const users = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      await dbConnet()
      res.status(200).json({ success: true })
      break

    case 'POST':
      const { name, email, password } = req.body
      await dbConnet()
      const passwordCrypto = await crypto(password)
      const user = new UsersModel({
        name,
        email,
        password: passwordCrypto
      })
      user.save()
      res.status(201).json({ sucess: true })
      break

    default:
      break
  }
}

export default users