import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { User } from "../users/user.model";
import { AuthService } from "../../services/authService";
import Controller from '../users/user.controller';
import { userOne } from "../users/user.model";

export default class UserController {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  public authenticate = async (req: Request, res: Response): Promise<any> => {
    console.log(1);
    
    const { email, password } = req.body;
    try {
      const user = await new AuthService().getUserByEmail(email);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found"
        });
      }
      const matchPasswords = await bcrypt.compare(password, user.password);
      if (!matchPasswords) {
        return res.status(401).send({
          success: false,
          message: "Not authorized"
        });
      }

      const token = await jwt.sign(
        { email, password, isAdmin: user.isAdmin},
        config.JWT_ENCRYPTION,
        {
          expiresIn: config.JWT_EXPIRATION
        }
      );
      res.status(200).send({
        success: true,
        message: "Token generated Successfully",
        data: token
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };

  public register = async (req: Request, res: Response): Promise<any> => {

    let YesNoAdmin:boolean;

    if(req.body.email === 'Admin@gmail.com') {
      YesNoAdmin = true;
    } else {
      YesNoAdmin = false;
    }

    const user: User = {
      id: null,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, config.SALT_ROUNDS),
      isAdmin: YesNoAdmin
    };
    try {
        
   const _users = await userOne.findAll();

   let count = 0;
    for (const userDB of  _users) {
    
      if ((userDB.email === user.email)) { 
        count++;
      }
    }
    if (count > 0) {
      return;
    }

    console.log(count);
   
      new AuthService().register(user);
      res.status(200).send({
        success: false,
        message: "User Successfully created",
        data: user
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.errors[0].message
      });
    }
  };



  

 

}
