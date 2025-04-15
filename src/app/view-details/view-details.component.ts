import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from '../DTO/productDTO';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { BrandDTO } from '../DTO/brandDTO';
import { ReviewDTO } from '../DTO/reviewDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionDTO } from '../DTO/questionDTO';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  brands: BrandDTO[] = [];
  product!: ProductDTO;
  cartItems: any[] = [];
  products: ProductDTO[] = [];
  reviews: ReviewDTO[] = [];
  chunkedReviews: ReviewDTO[][] = [];

  questions: QuestionDTO[] = [];
  image: File | null = null;
  productId!: number;
  showAllReviews: boolean = false;
  showQuestions: boolean = true;
  selectedQuestionIndex = -1;
  // pageNestion//
  questionsPerPage = 4;
  currentPage = 1;


  reviewForm: FormGroup = this.formBuilder.group({});
  questionForm: FormGroup = this.formBuilder.group({});
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  constructor(private router: Router,
              private dataLoaderService: DataLoaderService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
  ){
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  };
  ngOnInit(): void {
    this.cartItems = this.dataLoaderService.getCartItems().map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));

    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.productId = +routeId;
    } else if (this.product) {
      this.productId = this.product.productId;
    }

    this.reviewForm = this.formBuilder.group({
      headline: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      review: ['', Validators.required],
      rating: ['', Validators.required],
      image: ['', Validators.required],
      productId: [null]
    });
    // ✅ Patch productId into the form
    this.reviewForm.patchValue({ productId: this.productId });

    this.questionForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      question: ['', Validators.required],
      image: ['', Validators.required],
      productId: [null]
    });
     this.questionForm.patchValue({ productId: this.productId});

    this.getAllBrands();
    this.getAllProducts();
    this.getAllReview();
    this.getAllQuestions();
  }


  getAllBrands() {
    this.dataLoaderService.getAllBrands().subscribe(
      (res: any) => {
        this.brands = res.data;
      },
      (error) => {
        console.log('Brand  data is not showing', error);
      }
    )
  }

  getBrandName(brandId: number): string {
    const foundBrand = this.brands.find(brand => brand.brandId === brandId);
    return foundBrand ? foundBrand.brandName : 'Unknown';
  }

  getAllProducts(): void {
    this.dataLoaderService.getAllProducts().subscribe((data: ProductDTO[]) => {
      // Initialize quantity field if not present
      this.products = data.map(product => ({ ...product, quantity: 1 }));
    });
  }

  increaseQuantity(product: any): void {
    this.products[product].stockQuantity++;
  }

  decreaseQuantity(product: any): void {
    if (this.products[product].stockQuantity > 1) {
      this.products[product].stockQuantity--;
    }
  }

  addToCart(product: any) {
    this.dataLoaderService.addToCart(product);
    this.router.navigate(['/cart']);
  }
  setRating(star: number): void {
    this.reviewForm.get('rating')?.setValue(star);
  }

  getAllReview() {
    this.dataLoaderService.getProductReviews(this.productId).subscribe(
      (res: any) => {
        this.reviews = res.data || [];
        this.chunkedReviews = this.chunkArray(this.reviews, 2);
      },
      (error) => {
        console.log('Reviews not shown', error);
      }
    );
  }

  getAllQuestions() {
    this.dataLoaderService.getProductQuestion(this.productId).subscribe(
      (res: any) => {
        this.questions = res.data || [];
        // this.chunkedQuestions = this.chunkArray1(this.questions, 2);
      },
      (error) => {
        console.log('Question not shown', error);
      }
    );
  }

  chunkArray(arr: ReviewDTO[], chunkSize: number): ReviewDTO[][] {
    const result: ReviewDTO[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  chunkArray1(arr: QuestionDTO[], chunkSize: number): QuestionDTO[][] {
    const result: QuestionDTO[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  onSubmit() {
    if (this.reviewForm.valid && this.image) {
      const reviewdData = this.reviewForm.value;
      console.log("Payload Sent:", reviewdData); // 🔍 Debugging
      if (this.image) {
        this.dataLoaderService.createReview(reviewdData, this.image).subscribe(
          (res: any) => {
            alert("✅ Review Added Successfully");
            console.log("✅ Review Added Successfully", res);
            this.reviewForm.reset();
            this.getAllReview();
            this.closeBtn.nativeElement.click(); // ✅ Close popup 
          },
          err => {
            console.error("Error Adding Review", err);
          }
        );
      }
    } else {
      console.warn("⚠️ Form is invalid or image not selected.");
      this.reviewForm.markAllAsTouched(); // highlight invalid fields
    }
  }
  onFileChange(event: any, fileType: string): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      if (fileType === 'image') {
        this.image = files[0];
      }
    }
  }
  questionSubmit(){
    if(this.questionForm.valid && this.image){
      const questionData = this.questionForm.value;
      console.log("Payload Sent:", questionData); // 🔍 Debugging
      if (this.image) {
      this.dataLoaderService.createQuestion(questionData,this.image).subscribe(
        (res: any) =>{
          alert("✅ Question Added Successfully");
            console.log("✅ Question Added Successfully", res);
            this.questionForm.reset();
            this.getAllQuestions();
            this.closeBtn.nativeElement.click(); // ✅ Close popup 
          },
          err => {
            console.error("Error Adding Question", err);
          }
        );
      }
    } else {
      console.warn("⚠️ Form is invalid or image not selected.");
      this.reviewForm.markAllAsTouched(); // highlight invalid fields
    }
  }
  toggleReviews() {
    this.showAllReviews = !this.showAllReviews;
  }
  toggleQuestion(index: number) {
    this.selectedQuestionIndex = this.selectedQuestionIndex === index ? -1 : index;
  }

  
get paginatedQuestions() {
  const start = (this.currentPage - 1) * this.questionsPerPage;
  return this.questions.slice(start, start + this.questionsPerPage);
}

get totalPages() {
  return Math.ceil(this.questions.length / this.questionsPerPage);
}

changePage(page: number) {
  this.currentPage = page;
  this.selectedQuestionIndex = -1; // collapse open answers
}

}