import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { Frase } from 'src/app/shared/frase.model';
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy{
  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase | undefined

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  public atualizarResposta(resposta: Event): void {
    this.resposta = ((<HTMLInputElement>resposta.target).value)
  }

  public verificarResposta(): void {

    if(this.rodadaFrase?.frasePtBr == this.resposta){

      this.rodada++
      this.progresso = this.progresso + (100 / this.frases.length)

      if(this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
      }

      this.atualizaRodada()

    }else {
      this.tentativas--

      if(this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
      }
    }

  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }
}

