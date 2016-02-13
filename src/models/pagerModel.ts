export class PagerModel {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  navigateToPage: Function;
  pages: number[];
  totalPages: number;

  constructor(navigateToPage: Function, currentPage: number, totalPages: number, hasNext: boolean, hasPrevious: boolean) {
    this.currentPage = currentPage;
    this.hasNext = hasNext;
    this.hasPrevious = hasPrevious;
    this.navigateToPage = navigateToPage;
    this.totalPages = totalPages;
    const firstPage = Math.max(currentPage - 2, 1);
    const lastPage = Math.min(currentPage + 2, totalPages);
    this.pages = [];
    for (let i = firstPage; i <= lastPage; i++) {
      this.pages.push(i);
    }
  }
}