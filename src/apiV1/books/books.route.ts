import { Router } from "express";
import verifyAdmin from "../../helpers/verifyAdmin";
import Controller from "./books.controller";

const book: Router = Router();
const controller = new Controller();

// Retrieve all Users
book.get('/', controller.getBooks);

book.get('/:id',  controller.findOne);

// Update a User with Id
book.put('/:id', controller.update);

book.post('/', controller.addBook);

book.delete('/:id', controller.remove);

// book.put("/addBook", verifyAdmin, controller.addBooks);

export default book;
