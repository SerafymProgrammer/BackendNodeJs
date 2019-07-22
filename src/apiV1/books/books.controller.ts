import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { Book, books } from "./books.model";
import { ProductService } from "../../services/productsService";

export default class BooksController {
  public getBooks = async (req: Request, res: Response): Promise<any> => {
    try {

      const _books = await books.findAll();

      //console.log(_books);

      res.send(_books);
   
      if (!_books) {
        return res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: _books
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
      const _book = await books.findOne({where:{id: req.params.id}});
    
      if (!_book) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: _book
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };



  public update = async (req: Request, res: Response): Promise<any> => {

    const {
 
      name,
      author,
      price,
      description,
      img} = req.body;

    console.log(req.body);

    try {
      const _book = await books.findOne({ where: { id: req.params.id } });

      books.update(
        { 
 
          name,
          author,
          price,
          description,
          img
        },
        {
          where: {
            id: req.params.id
          }
        });
      if (!_book) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: _book
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



  public addBook =  async (req: Request, res: Response): Promise<any> => {
    const book: Book = {
      id: null,
      name:  req.body.name,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      img: req.body.img
    };
    try {
        
   const _books = await books.findAll();

   let count = 0;
    for (const bookDB of  _books) {
    
      if ((bookDB.name === book.name) && (bookDB.author === book.author)) {
        
        count++;

      }
    }
    if (count > 0) {
      return;
    }

    console.log(count);
   
      new ProductService().addProduct(book);
      res.status(200).send({
        success: false,
        message: "Book Successfully created",
        data: book
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.errors[0].message
      });
    }
  }


  public remove = async (req: Request, res: Response): Promise<any> => {

   
    try {
      const _book = await books.findOne({ where: { id: req.params.id } });

      books.destroy(
        {
          where: {
            id: req.params.id
          }
        });
   if (!_book) {
        return res.status(404).send({
          success: false,
          message: 'Book not found',
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
