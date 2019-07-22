import CONFIG from "../config/config";
import { Book } from "../apiV1/books/books.model";
import conn from "../config/db.connection";
import to from "await-to-js";
import * as Sequelize from "sequelize";
import sequelize from "../config/db.connection";

import { books } from "../apiV1/books/books.model";

export class ProductService {
  public async getProducts(page: number): Promise<Book[]> {
    return await books.findAll({
      limit: 10,
      offset: page
    });
  }
  public async addProduct(book: Book) {
    await books.create(book);
  }
}
