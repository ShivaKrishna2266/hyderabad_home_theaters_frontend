import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { QuestionDTO } from 'src/app/DTO/questionDTO';
import { ProductService } from 'src/app/services/admin/product.service';
import { QuestionsService } from 'src/app/services/admin/questions.service';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss']
})
export class QuestionsAnswersComponent implements OnInit{
  questions: QuestionDTO[] = [];
  filteredQuestions: QuestionDTO[] = [];
  products : ProductDTO[]=[];

  selectedStatus: string | null = null;
  selectedProductId: number | null = null;
  constructor( private questionsService :QuestionsService,
      private productService: ProductService){

  }
  ngOnInit(): void {
    this.getAllQuestions();
  }



getAllQuestions() {
  this.questionsService.getAllQuestions().subscribe(
    (res: any) => {
      this.questions = Array.isArray(res.data) ? res.data : [];
      this.filteredQuestions = [...this.questions];
      this.applyFilters();
    },
    (error) => {
      console.error('Error fetching questions:', error);
    }
  );
}

applyFilters(): void {
  // this.filteredQuestions = this.questions.filter(question => {
  //   const matchesStatus = this.selectedStatus ? question.status === this.selectedStatus : true;
  //   const matchesProduct = this.selectedProductId ? question.product.productId === this.selectedProductId : true;
  //   return matchesStatus && matchesProduct;
  // });
}
}
