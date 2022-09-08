import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class FofocasController {
    public async index({ }: HttpContextContract) {
        const fofoca = await fofoca.query().preload('user').orderBy('id')
        return fofoca
      }
    
      public async store({ request, auth }: HttpContextContract) {
        const data = await request.validate(fofocaValidator)
        const fofoca = await fofoca.create({ ...data, userId: auth.user?.id })
        return fofoca
      }
    
      public async show({ params, response }: HttpContextContract) {
        try {
          const fofoca = await fofoca.findOrFail(params.id)
          return fofoca
        } catch (error) {
          response.status(400).send("fofoca não encontrada!!!")
        }
      }
    
      public async update({ request, params, response }: HttpContextContract) {
        const { title, fofoca } = await request.validate(fofocaValidator)
        try {
          const fofoca = await fofoca.findOrFail(params.id)
          fofoca.title = title
          fofoca.fofoca = fofoca
          await fofoca.save()
          return fofoca
    
        } catch (error) {
          response.status(400).send("fofoca não encontrada!!!")
        }
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        try {
          const fofoca = await fofoca.findOrFail(params.id)
          await fofoca.delete()
          return fofoca
        } catch (error) {
          response.status(400).send("fofoca não encontrada!!!")
        }
      }

