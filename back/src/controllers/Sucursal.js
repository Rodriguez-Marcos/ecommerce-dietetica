import Sucursal from '../models/Sucursal'

export async function AddSucursal(req, res) {
    const { name, src } = req.body
    let newSrc = src.split('"')[1]
     try {
        let newsucursal = await Sucursal.create({
            name: name,
            src: newSrc
        })
        if (newsucursal) {
            return res.json({
                message: "se creo sucursal nueva",
                data: newsucursal
            })
        }
    } catch (err) {
        console.log(err)
        res.json({ message: "algo salio mal" })
    } 
}

export async function PutSucursal(req, res) {
    const { name, src } = req.body
    const { id } = req.params
    try {
        let newsucursal = await Sucursal.update({
            name: name,
            src: src
        },
            {
                where: { id: id }
            })
        if (newsucursal) {
            return res.json({
                message: "se modifico sucursal",
                data: newsucursal
            })
        }
    } catch (err) {
        console.log(err)
        res.json({ message: "algo salio mal" })
    }
}

export async function deleteSucursal(req, res) {
    const { id } = req.params
    try {
        let newsucursal = await Sucursal.destroy({ where: { id: id } })
        return res.json({
            message: "se borro sucursal",
            data: newsucursal
        })
    } catch (err) {
        console.log(err)
        res.json({ message: "algo salio mal" })
    }
}

export async function getSucursal(req, res) {
    try {
        var sucursales = await Sucursal.findAll()
        return res.json({
            message: "estas son todas las sucurasles",
            data: sucursales
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "algo salio mal" })
    }
}