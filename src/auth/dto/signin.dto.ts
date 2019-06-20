import {ApiModelProperty} from '@nestjs/swagger'

export class SignInDTO {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}