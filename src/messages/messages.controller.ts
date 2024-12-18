import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@ApiBearerAuth()
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Req() req) {
    const userId = req.user.id;
    return this.messagesService.create(createMessageDto,userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('last/:id')
  LastMessages(@Param('id') id: string,@Req() req) {
    const userId = req.user.id
    return this.messagesService.LastMessage(+id,userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string,@Req() req) {
    const userId = req.user.id
    return this.messagesService.findOne(+id,userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
