const books = [
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    cover: "./images/clean_code_cover.png",
    rating: 4.8,
    reviews: 124,
    description:
      "A handbook of agile software craftsmanship, with practical advice for writing code that is easier to understand, improve, and maintain.",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    cover: "./images/atomic_habits_cover.png",
    rating: 4.8,
    reviews: 98,
    description:
      "A practical guide to building good habits, breaking bad ones, and making small changes that lead to remarkable results.",
  },
  {
    id: "the-martian",
    title: "The Martian",
    author: "Andy Weir",
    category: "Science Fiction",
    cover: "./images/the_martian_cover.png",
    rating: 4.7,
    reviews: 156,
    description:
      "An astronaut stranded on Mars must draw on his ingenuity, engineering skills, and determination to survive.",
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    category: "Fantasy",
    cover: "./images/dune_cover.png",
    rating: 4.6,
    reviews: 210,
    description:
      "On the desert planet Arrakis, Paul Atreides is swept into a sweeping story of power, destiny, and survival.",
  },
  {
    id: "the-5am-club",
    title: "The 5 AM Club",
    author: "Robin Sharma",
    category: "Productivity",
    cover: "./images/the_5am_club_cover.png",
    rating: 4.5,
    reviews: 87,
    description:
      "A story-led guide to building a morning routine that helps you focus, grow, and make the most of every day.",
  },
]

const bookGrid = document.querySelector("#book-grid")
const searchInput = document.querySelector("#book-search")
const categoryFilter = document.querySelector("#category-filter")
const emptyState = document.querySelector("#empty-state")
const clearFilterButton = document.querySelector("#clear-filter")
const addBookBackdrop = document.querySelector("#add-book-backdrop")
const detailsBackdrop = document.querySelector("#book-details-backdrop")
const addBookForm = document.querySelector("#add-book-form")
const detailsContent = document.querySelector("#book-details-content")
let lastFocusedElement = null
let activeCategory = ""

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }
    return entities[character]
  })
}

function getStarMarkup(rating) {
  const roundedRating = Math.round(rating)
  return `<span class="rating-stars" aria-hidden="true">${"★".repeat(roundedRating)}${"☆".repeat(5 - roundedRating)}</span>`
}

function getCoverMarkup(book) {
  if (book.cover) {
    return `<img class="book-cover" src="${escapeHtml(book.cover)}" alt="${escapeHtml(book.title)} book cover" />`
  }

  return `
    <div class="generated-cover" role="img" aria-label="${escapeHtml(book.title)} book cover">
      <svg class="brand-icon" viewBox="0 0 42 38" aria-hidden="true">
        <path d="M3 5.5c6.6-2 12.3-.9 18 3.2v26c-5.7-4.1-11.4-5.2-18-3.2z" />
        <path d="M39 5.5c-6.6-2-12.3-.9-18 3.2v26c5.7-4.1 11.4-5.2 18-3.2z" />
        <path class="brand-icon-fold" d="M21 8.7v26" />
      </svg>
      <span>${escapeHtml(book.title)}</span>
      <small>${escapeHtml(book.author)}</small>
    </div>
  `
}

function getVisibleBooks() {
  const query = searchInput.value.trim().toLocaleLowerCase()

  return books.filter((book) => {
    const matchesSearch =
      !query ||
      `${book.title} ${book.author}`.toLocaleLowerCase().includes(query)
    const matchesCategory = !activeCategory || book.category === activeCategory
    return matchesSearch && matchesCategory
  })
}

function renderBooks() {
  const visibleBooks = getVisibleBooks()
  bookGrid.innerHTML = visibleBooks
    .map(
      (book) => `
        <article class="book-card">
          <div class="cover-frame">${getCoverMarkup(book)}</div>
          <div class="book-info">
            <h3 title="${escapeHtml(book.title)}">${escapeHtml(book.title)}</h3>
            <p class="book-author" title="${escapeHtml(book.author)}">${escapeHtml(book.author)}</p>
            <button class="category-link" type="button" data-category="${escapeHtml(book.category)}">${escapeHtml(book.category)}</button>
            <div class="book-rating" aria-label="${book.reviews ? `${book.rating.toFixed(1)} out of 5 stars, ${book.reviews.toLocaleString()} reviews` : "No ratings yet"}">
              ${getStarMarkup(book.rating)}
              <span class="rating-value">${book.reviews ? book.rating.toFixed(1) : "New"}</span>
              <span class="review-count">${book.reviews ? `(${book.reviews.toLocaleString()} reviews)` : "(no reviews)"}</span>
            </div>
            <button class="button button-primary details-button" type="button" data-book-id="${escapeHtml(book.id)}">
              View Details
            </button>
          </div>
        </article>
      `,
    )
    .join("")

  emptyState.hidden = visibleBooks.length > 0
  bookGrid.hidden = visibleBooks.length === 0
  clearFilterButton.hidden = !activeCategory && !searchInput.value.trim()
}

function openModal(backdrop) {
  lastFocusedElement = document.activeElement
  backdrop.hidden = false
  document.body.classList.add("modal-open")
  backdrop.querySelector(".modal-close").focus()
}

function closeModal(backdrop) {
  if (backdrop.hidden) return

  backdrop.hidden = true
  if (addBookBackdrop.hidden && detailsBackdrop.hidden) {
    document.body.classList.remove("modal-open")
  }
  lastFocusedElement?.focus()
}

function openBookDetails(bookId) {
  const book = books.find((item) => item.id === bookId)
  if (!book) return

  const reviews = book.reviews
    ? `${book.reviews.toLocaleString()} reader reviews`
    : "No reviews yet"

  detailsContent.innerHTML = `
    <div class="book-detail">
      <div class="detail-cover-wrap">${getCoverMarkup(book)}</div>
      <div class="detail-copy">
        <p class="modal-kicker">${escapeHtml(book.category)}</p>
        <h2 id="details-title">${escapeHtml(book.title)}</h2>
        <p class="detail-author">by ${escapeHtml(book.author)}</p>
        <div class="detail-rating" aria-label="${book.reviews ? `${book.rating.toFixed(1)} out of 5 stars` : "No ratings yet"}">
          ${getStarMarkup(book.rating)}
          <span class="rating-value">${book.reviews ? book.rating.toFixed(1) : "New"}</span>
          <span class="review-count">${reviews}</span>
        </div>
        <p class="detail-description">${escapeHtml(book.description || "A new addition to the BookHub collection. Add it to your reading list and discover something new.")}</p>
        <button class="button button-primary" type="button" data-close-modal>Done</button>
      </div>
    </div>
  `

  openModal(detailsBackdrop)
}

document.querySelector("#open-add-book").addEventListener("click", () => {
  addBookForm.reset()
  addBookForm.querySelector('[name="title"]').setCustomValidity("")
  addBookForm.querySelector('[name="author"]').setCustomValidity("")
  openModal(addBookBackdrop)
})

searchInput.addEventListener("input", renderBooks)
categoryFilter.addEventListener("change", () => {
  activeCategory = categoryFilter.value
  renderBooks()
})

bookGrid.addEventListener("click", (event) => {
  const detailsButton = event.target.closest("[data-book-id]")
  if (detailsButton) openBookDetails(detailsButton.dataset.bookId)

  const categoryButton = event.target.closest("[data-category]")
  if (categoryButton) {
    activeCategory =
      activeCategory === categoryButton.dataset.category
        ? ""
        : categoryButton.dataset.category
    categoryFilter.value = activeCategory
    renderBooks()
  }
})

clearFilterButton.addEventListener("click", () => {
  activeCategory = ""
  categoryFilter.value = ""
  searchInput.value = ""
  renderBooks()
})

addBookForm.addEventListener("input", (event) => {
  if (event.target.matches('[name="title"], [name="author"]')) {
    event.target.setCustomValidity("")
  }
})

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const titleInput = addBookForm.elements.title
  const authorInput = addBookForm.elements.author
  titleInput.setCustomValidity(titleInput.value.trim() ? "" : "Enter a book title.")
  authorInput.setCustomValidity(authorInput.value.trim() ? "" : "Enter the author's name.")

  if (!addBookForm.reportValidity()) return

  const formData = new FormData(addBookForm)
  books.unshift({
    id: `book-${Date.now()}`,
    title: String(formData.get("title")).trim(),
    author: String(formData.get("author")).trim(),
    category: String(formData.get("category")),
    cover: "",
    rating: 0,
    reviews: 0,
    description: String(formData.get("description")).trim(),
  })

  activeCategory = ""
  categoryFilter.value = ""
  searchInput.value = ""
  renderBooks()
  closeModal(addBookBackdrop)
})

document.addEventListener("click", (event) => {
  const closeButton = event.target.closest("[data-close-modal]")
  if (closeButton) {
    closeModal(closeButton.closest(".modal-backdrop"))
    return
  }

  if (event.target === addBookBackdrop) closeModal(addBookBackdrop)
  if (event.target === detailsBackdrop) closeModal(detailsBackdrop)
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(addBookBackdrop)
    closeModal(detailsBackdrop)
  }
})

renderBooks()
