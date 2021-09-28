import Diet from '../models/Diet.js';

export async function createDiet(req, res) {
    const { name, description } = req.body;
    try {
        let newDiet = await Diet.create({
            name,
            description,
        }, {
            fields: ['name', 'description']
        }
        )
        if (newDiet) {
            return res.json({
                message: 'Diet created successfully',
                data: newDiet
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
export async function getDiets(req, res) {
    try{
    let diets = await Diet.findAll()
    return res.status(200).send(diets)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function deleteDiet(req,res){
    const {id}=req.params
    try{
    let diet = await Diet.destroy({where: {id:id}})
    return res.json({
        message: 'Diet deleted successfully',
        data: diet
    })
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}