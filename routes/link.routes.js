const {Router} = require('express')
const Link = require('../models/Link')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const shortid = require("shortid")
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()

        const existed = await Link.findOne( {from} )

        if (existed) {
            return res.json({ link: existed })
        }
        
        const to = `${baseUrl}/t/${code}`

        const link = new Link({
            from, to, code, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ link })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong with server, try again! Error: ' + e.message})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId })
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong with server, try again! Error: ' + e.message})
    }
})

router.post('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id) 
        res.json(link)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong with server, try again! Error: ' + e.message})
    }
})

module.exports = router