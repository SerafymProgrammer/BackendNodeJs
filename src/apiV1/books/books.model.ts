import sequelize from "../../config/db.connection";
import * as Sequelize from "sequelize";

export const books: any = sequelize.define("books", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

export interface Book {
  id: number;
  name: string;
  author: string;
  price: string;
  description: string;
  img: string;
}
