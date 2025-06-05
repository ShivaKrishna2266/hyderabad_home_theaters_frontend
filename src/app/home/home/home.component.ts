import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerDTO } from 'src/app/DTO/bannerDTO';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { TestimonialDTO } from 'src/app/DTO/testimonialDTO';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataLoaderService } from 'src/app/services/data_loader/data-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  banner!: BannerDTO;
  bannerId!: number;

  //  banner?: BannerDTO;
   banners?: BannerDTO;
  title: string = 'Services Banner';

  // Defult Testimonial//

  setDefaultTestimonials() {
    this.testimonials = [{
      testimonialId: 1,
      name: "Preethi",
      image: "../../assets/mockInterviews/developer_Preethi.jpg",
      designation: "Web Developer",
      description: "“I am a full-time employee at an IT solutions company. I took multiple online IT training courses. The course material was thorough and impressive. The teachers are also very supportive. I was easily able to update my skills concurrently with my job. Thank you Ashok IT expert teaching team for all your support and guidance.”",
      role: "",
      star: "5",
      status: "Active",
      message: ""
    },
    {
      testimonialId: 2,
      name: "Shiva Krishna",
      image: "../../assets/testimonial/Shiva Photo.jpg",
      designation: "Marketing Specialist",
      description: "“I consider my experience at Ashok IT to be incredibly important in my growth as a competent professional. During my time at Ashok IT, I had the opportunity to learn through both books and practice and develop a large variety of essential technical skills. Thank you Ashok IT .”",
      role: "",
      star: "5",
      status: "Active",
      message: ""
    },
    {
      testimonialId: 3,
      name: "Soumya",
      image: "../../assets/mockInterviews/developer_soumya.jpg",
      designation: "Graphic Designer",
      description: "“I have completed multiple certification courses from Ashok IT including Java, cloud computing, and data structures and algorithm. I was greatly impressed by the commendable teaching methodologies and experienced and insightful tutors who were able to simplify the process of learning various complex technologies.”",
      role: "",
      star: "5",
      status: "Active",
      message: ""
    },
    {
      testimonialId: 4,
      name: "Sparsha",
      image: "../../assets/testimonial/Sparsha Photo.jpg",
      designation: "Technical Specialist",
      description: "“I am a full-time employee at an IT solutions company. I took multiple online IT training courses. The course material was thorough and impressive. The teachers are also very supportive. I was easily able to update my skills concurrently with my job. Thank you Ashok IT expert teaching team for all your support and guidance.”",
      role: "",
      star: "5",
      status: "Active",
      message: ""
    },
    {
      testimonialId: 5,
      name: "Mahesh",
      image: "../../assets/mockInterviews/developer_mahesh_1.jpg",
      designation: "Software Developer",
      description: "“I consider my experience at Ashok IT to be incredibly important in my growth as a competent professional. During my time at Ashok IT, I had the opportunity to learn through both books and practice and develop a large variety of essential technical skills. Thank you Ashok IT .”",
      role: "",
      star: "5",
      status: "Active",
      message: ""
    },
    {
      testimonialId: 6,
      name: "Shreyanshika",
      image: "../../assets/testimonial/Preethi Padma photo.jpg",
      designation: "Graphic Designer",
      description: "“I have completed multiple certification courses from Ashok IT including Java, cloud computing, and data structures and algorithm. I was greatly impressed by the commendable teaching methodologies and experienced and insightful tutors who were able to simplify the process of learning various complex technologies.”",
      role: "",
      star: "5",
      status: "Active",
      message: ""
    }
    ];
    this.chunkTestimonials();
  }

  hovering: { [productId: string]: boolean } = {};

  products: ProductDTO[] = [];
  displayedProducts: ProductDTO[] = [];
  categories: CategoryDTO[] = [];
  paginatedCategories: CategoryDTO[] = [];
  categoryId: number | null = null;
  brands: BrandDTO[] = [];
  chunkedTestimonials: TestimonialDTO[][] = [];
  testimonials: TestimonialDTO[] = [];
  public isChatBoxEnable: boolean = false;

  // showCategories: boolean = true; // Set to false to hide categories

  // Separate Pagination States
  currentProductPage: number = 1;
  currentCategoryPage: number = 1;
  itemsPerPage: number = 4; // Show 4 items per page
  Math: any;

  constructor(
    private dataLoaderService: DataLoaderService,
    private cartService: CartService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllBrands();
    this.getAllTestimonials();
    this.getAllBanners();
    this.loadBannerByTitle();

    // Get the bannerId from route parameters (e.g., /carousel/123)
    this.bannerId = +this.route.snapshot.paramMap.get('bannerId')!;
    this.getBannerById(this.bannerId);

    this.dataLoaderService.getBannerByTitle('YourTitleHere').subscribe({
      next: (res) => this.banner = res.data,
      error: (err) => console.error(err)
    });

     const title = this.route.snapshot.queryParamMap.get('title');
  if (title) {
    this.getBannerByTitle(title);
  }
  }

  isFullUrl(image: string): boolean {
    return image.startsWith('http');
  }

  

  getAllBanners(): void {
    this.dataLoaderService.getAllBanners().subscribe((res: any) => {
      if (res.data?.length) {
        this.banner = res.data[0]; // take the first banner
      }
    });
  }

 loadBannerByTitle(): void {
    this.dataLoaderService.getBannerByTitle(this.title).subscribe({
      next: (res) => {
        this.banners = res.data;
        console.log('Banner loaded:', this.banners);
      },
      error: (err) => {
        console.error('Banner not found:', err);
      }
    });
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/banners_images/fallback-image.jpg';
  }
  getBannerById(bannerId: number): void {
    this.dataLoaderService.getBannerById(bannerId).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.banner = res.data;
        } else {
          console.error('No banner data found');
        }
      },
      error: (err) => {
        console.error('Error fetching banner:', err);
      }
    });
  }

  getBannerByTitle(title: string): void {
  this.dataLoaderService.getBannerByTitle(title).subscribe({
    next: (res) => {
      this.banner = res.data;
    },
    error: (err) => {
      console.error('Error fetching banner:', err);
    }
  });
}
getImageUrl(image: string): string {
  return this.isFullUrl(image) ? image : 'assets/banners_images/' + image;
}



  getAllProducts(): void {
    this.dataLoaderService.getAllProducts().subscribe(
      (res: { data: ProductDTO[] }) => {
        this.products = res.data;
        this.updateDisplayedProducts(); // Set first page
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getAllCategories(): void {
    this.dataLoaderService.getAllCategories().subscribe(
      (res: { data: CategoryDTO[] }) => {
        this.categories = res.data;
        this.updatePagination();
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getAllBrands(): void {
    this.dataLoaderService.getAllBrands().subscribe(
      (response: BrandDTO[] | { data: BrandDTO[] } | any) => { // Explicitly define possible types
        console.log('API Response:', response); // Debugging log
        // Ensure response is an array before using reduce
        if (Array.isArray(response)) {
          this.brands = response.reduce((acc: { [key: number]: string }, brand: BrandDTO) => {
            acc[brand.brandId] = brand.brandName; // Map brandId to brandName
            return acc;
          }, {});
        } else if (response && response.data && Array.isArray(response.data)) {
          // Handle case where API returns { data: [...] }
          this.brands = response.data.reduce((acc: { [key: number]: string }, brand: BrandDTO) => {
            acc[brand.brandId] = brand.brandName;
            return acc;
          }, {});
        } else {
          console.error('Unexpected response format:', response);
          this.brands = response.data; // Fallback to an empty object
        }
      },
    );
  }



  updateDisplayedProducts(): void {
    const startIndex = (this.currentProductPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentProductPage < Math.ceil(this.products.length / this.itemsPerPage)) {
      this.currentProductPage++;
      this.updateDisplayedProducts();
    }
  }

  prevPage(): void {
    if (this.currentProductPage > 1) {
      this.currentProductPage--;
      this.updateDisplayedProducts();
    }
  }

  updatePagination(): void {
    const startIndex = (this.currentCategoryPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCategories = this.categories.slice(startIndex, endIndex);
  }

  nextPage2(): void {
    if (this.currentCategoryPage < Math.ceil(this.categories.length / this.itemsPerPage)) {
      this.currentCategoryPage++;
      this.updatePagination();
    }
  }

  prevPage2(): void {
    if (this.currentCategoryPage > 1) {
      this.currentCategoryPage--;
      this.updatePagination();
    }
  }

  get totalproductPages(): number {
    return this.products.length ? Math.ceil(this.products.length / this.itemsPerPage) : 1;
  }

  get totalCategoryPages(): number {
    return this.categories.length ? Math.ceil(this.categories.length / this.itemsPerPage) : 1;
  }

  filterSubcategories(): void {
    this.categories = this.categories.filter(sub => sub.categoryId === this.categoryId);
  }

  showCategories(): void {
    this.categoryId = null;
    this.categories = [];
    this.router.navigate(['/categories']);
  }

  logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';

  handleError() {
    this.logoSrc = 'https://cdn.clare.ai/wati/images/WATI_logo_square_2.png';
  }

  messageUs() {
    this.isChatBoxEnable = true;
  }

  closePopup() {
    console.log('Closing chatbox...');
    this.isChatBoxEnable = false;
    console.log('Chatbox closed:', this.isChatBoxEnable);
  }


  getAllTestimonials() {
    this.dataLoaderService.getAllTestimonial().subscribe(
      (res: any) => {
        if (res.data && res.data.length > 0) {
          this.testimonials = res.data;
          this.chunkTestimonials();
        } else {
          this.setDefaultTestimonials();
        }
      },
      (error) => {
        console.log('Error fetching testimonials: ', error);
        this.setDefaultTestimonials();
      }
    );
  }

  // chunkClients(): void {
  //   const chunkSize = 4;
  //   this.chunkedClients = [];
  //   for (let i = 0; i < this.clients.length; i += chunkSize) {
  //     this.chunkedClients.push(this.clients.slice(i, i + chunkSize));
  //   }
  // }
  chunkTestimonials() {
    const chunkSize = 3;
    for (let i = 0; i < this.testimonials.length; i += chunkSize) {
      this.chunkedTestimonials.push(this.testimonials.slice(i, i + chunkSize));
    }
  }

  // Add Cart//
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }
  viewProductDetails(product: any) {
    this.router.navigate(['/view-details'], { state: { product } });
  }

}
