export class PagerModel {
  currentPage: number;
  getUrl: Function;
  hasNext: boolean;
  hasPrevious: boolean;
  navigateToPage: Function;
  pages: number[];
  totalPages: number;

  constructor(getUrl: Function, navigateToPage: Function, currentPage: number, totalPages: number, hasNext: boolean, hasPrevious: boolean) {
    this.currentPage = currentPage;
    this.getUrl = getUrl;
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