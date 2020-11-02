const {Router} = require('express')
const router = Router()
const Link = require('../models/Link')

router.get('/:code', async (req,res) => {
    try {
        
        const link = await Link.findOne({ code: req.params.code })

        if (link) {
            link.click++
            await link.save()
            res.redirect(link.from)
        }

        res.status(404).json('Link not found')

    } catch (e) {
        res.status(500).json({message: 'Something went wrong with REDIRECT, try again! Error: ' + e.message})
    }
})

module.exports = router