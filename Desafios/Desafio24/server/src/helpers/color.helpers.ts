import { Context } from "../../deps.ts";
import { Color } from "../types/color.type.ts";

const DB_COLOR: Color[] = [];

export const findAll = async (ctx: Context) => {
  try {
    ctx.response.status = 200;
    console.info(`status: ${ctx.response.status}, method: findAll handler`);
    ctx.response.body = await { code: "00", data: DB_COLOR };
  } catch (error) {
    ctx.response.status = 500;

    console.error(`status: ${ctx.response.status}, ${error}`);
  }
};

export const save = async (ctx: Context) => {
  try {
    ctx.response.status = 201;
    console.info(`status: ${ctx.response.status}, method: save handler`);

    const { colorName } = await ctx.request.body().value;

    //const newId = Number(DB_COLOR[DB_COLOR.length - 1].uuid) + 1;
    const color: Color = {
      //uuid: newId.toString(),
      colorName: colorName,
    };
    console.log(colorName);
    
    DB_COLOR.push(color);
    ctx.response.body = { code: "00", data: color };
  } catch (error) {
    ctx.response.status = 500;

    console.error(`status: ${ctx.response.status}, ${error}`);
  }
};
