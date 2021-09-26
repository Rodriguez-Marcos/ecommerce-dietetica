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