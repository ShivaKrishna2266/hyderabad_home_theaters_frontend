import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { QuestionDTO } from 'src/app/DTO/questionDTO';
import { QuestionsService } from 'src/app/services/admin/questions.service';
import { DataService } from 'src/app/services/data/data.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-question-answer',
  templateUrl: './edit-question-answer.component.html',
  styleUrls: ['./edit-question-answer.component.scss']
})
export class EditQuestionAnswerComponent implements OnInit {
  questions: QuestionDTO = {} as QuestionDTO;
  products: ProductDTO[] = [];
  constructor(
    private questionsService: QuestionsService,
    private productService: ProductService,
    private dataService: DataService,
    private router: Router,
  ) { };

  ngOnInit(): void {

    const questionData = this.dataService.questionsData;
    if (questionData) {
      this.questions = questionData;
    }
  }

  onSubmit(): void {
    if (!this.questions.question || !this.questions.questionId) {
      alert('Please fill all required fields: question Name and product Name.');
      return;
    }

    this.questionsService.updateQuestions(this.questions).subscribe(
      (res: any) => {
        console.log('Question Successfully updated:', res);
        alert('Question updated successfully!');
        this.router.navigate(['/admin/Q&S']);
      },
      (error: any) => {
        console.error('Error updating Question And Answers:', error);
        alert(`Failed to update Question And Answers. ${error.message || 'Unknown error'}`);
      }
    );
  }
}
