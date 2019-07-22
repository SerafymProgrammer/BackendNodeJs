import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { userOne, User } from "./user.model";
import { AuthService } from "../../services/authService";

export default class UserController {
  
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const _users = await userOne.findAll();
      res.send(_users);
      if (!_users) {
        return res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: _users
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const _user = await userOne.findOne({where:{id: req.params.id}, attributes : ['id', 'email', 'password']});
    
      if (!_user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: _user
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  /**
   * addUser
   */
  public addUser  =  async (req: Request, res: Response): Promise<any> => {

  }

  public update = async (req: Request, res: Response): Promise<any> => {

    const { email, password } = req.body;

    console.log(req.body);

    try {
      const _user = await userOne.findOne({ where: { id: req.params.id } });

      userOne.update(
        { email, password:await bcrypt.hash(req.body.password, config.SALT_ROUNDS)},
        {
          where: {
            id: req.params.id
          }
        });
      if (!_user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: _user
      })
    }
    catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }


  };

  public remove = async (req: Request, res: Response): Promise<any> => {

   
    try {
      const _user = await userOne.findOne({ where: { id: req.params.id } });

      userOne.destroy(
        {
          where: {
            id: req.params.id
          }
        });
   if (!_user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
