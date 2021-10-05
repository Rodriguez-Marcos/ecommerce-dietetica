import Favorite from '../models/Favorite.js';

export async function createFavorite(req, res) {
    const {  id } = req;
    const id_client= id;
    try {
        let newFavorite = await Favorite.create({
            
            'id_client':id_client
        }
        )
        if (newFavorite) {
            return res.json({
                message: 'Favorite created successfully',
                data: newFavorite
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function getFavorites(req, res) {
    try{
    let favorite = await Favorite.findAll()
    return res.status(200).send(favorite)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}