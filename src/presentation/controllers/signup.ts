import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let returnObject

    const requiredFields = ['name', 'email']

    requiredFields.forEach((field) => {
      if (!httpRequest.body[field]) {
        returnObject = badRequest(new MissingParamError(field))
      }
    })

    return returnObject
  }
}
