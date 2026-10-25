// Dana's plain words for each review status, in Khmer and English.
// The database only allows these three values (check constraint from Lab 10).
export const STATUS_WORDS = {
  pending: {
    khmer: "កំពុងរង់ចាំការពិនិត្យ",
    english: "Waiting for review",
    color: "var(--accent-2)",
  },
  published: {
    khmer: "បានចុះផ្សាយ",
    english: "Published in the archive",
    color: "var(--accent)",
  },
  returned: {
    khmer: "បានបញ្ជូនត្រឡប់វិញ",
    english: "Returned to you for changes",
    color: "var(--error)",
  },
};
