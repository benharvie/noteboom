const crypto = require('crypto')
const { Router } = require('express')

const api = Router()

module.exports = (db) => {
  // Create note
  api.post('/api/create', async (req, res) => {
    const { note } = req.body
    const public_key = crypto.randomBytes(16).toString('hex').slice(0, 16)
    const secret_key = crypto.randomBytes(16).toString('hex')

    // Encrypt
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(secret_key),
      Buffer.from(public_key)
    )
    let encrypted_note = cipher.update(note, 'utf8', 'hex')
    encrypted_note += cipher.final('hex')

    await db.collection('notes').insertOne({ public_key, note: encrypted_note })
    return res.json({
      public_key,
      secret_key,
      action: 'create',
      status: true,
    })
  })

  // Read note
  api.get('/api/read/:public_key/:secret_key', async (req, res) => {
    const { public_key, secret_key } = req.params
    try {
      const { note } = await db.collection('notes').findOne({ public_key })

      // Decrypt
      const cipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(secret_key),
        Buffer.from(public_key)
      )
      let decrypted_note = cipher.update(note, 'hex', 'utf8')
      decrypted_note += cipher.final('utf8')

      await db.collection('notes').deleteOne({ public_key })
      res.json({
        public_key,
        note: decrypted_note,
        action: 'read',
        status: true,
      })
    } catch (error) {
      console.error(error)
      res.json({
        public_key,
        message: 'Could not find note.',
        action: 'read',
        status: false,
      })
    }
  })

  // Delete note on demand
  api.delete('/api/delete/:public_key', async (req, res) => {
    const { public_key } = req.params
    try {
      await db.collection('notes').deleteOne({ public_key })
      res.json({ public_key, action: 'delete', status: true })
    } catch (error) {
      console.error(error)
      res.json({
        public_key,
        message: 'Could not find note.',
        action: 'delete',
        status: false,
      })
    }
  })

  return api
}
