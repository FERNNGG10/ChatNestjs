import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class EntityNotFoundFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
