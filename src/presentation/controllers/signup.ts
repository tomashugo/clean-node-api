import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let statusCode
    let body

    if (!httpRequest.body.name) {
      statusCode = 400
      body = new MissingParamError('name')
    }

    if (!httpRequest.body.email) {
      statusCode = 400
      body = new MissingParamError('email')
    }

    return {
      statusCode,
      body
    }
  }
}
