import express,{ Express } from "express";
import path from 'path';
import api from "../api";
import config from '../config';

async function express_loader(app: Express) {
    // Middle-ware settings
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // API Route
    if(config.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, '../../../frontend/dist')));
    }
    app.use("/api",api);
    if(config.NODE_ENV === "production"){
        app.get('*',(_,res)=>{
            res.sendFile(path.join(__dirname, '../../../frontend/dist/index.html'));
        });
    }
}

export default express_loader;
