import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let statusCode
    let body

    if (!httpRequest.body.name) {
      statusCode = 400
      body = new Error('Missing param: name')
    }

    if (!httpRequest.body.email) {
      statusCode = 400
      body = new Error('Missing param: email')
    }

    return {
      statusCode,
      body
    }
  }
}
