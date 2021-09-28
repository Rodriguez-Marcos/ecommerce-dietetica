import Category from '../models/Category.js';

export async function createCategory(req, res) {
    const { name, description } = req.body;
    try {
        let newCategory = await Category.create({
            name,
            description,
        }, {
            fields: ['name', 'description']
        }
        )
        if (newCategory) {
            return res.json({
                message: 'Category created successfully',
                data: newCategory
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
export async function getCategories(req, res) {
    try{
    let categories = await Category.findAll()
    return res.status(200).send(categories)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function deleteCategory(req,res){
    const {id}=req.params
    try{
    let category = await Category.destroy({where: {id:id}})
    return res.json({
        message: 'Category deleted successfully',
        data: category
    })
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}