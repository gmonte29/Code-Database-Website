class Solution:
    
    #94.04% time complexity, 25.10% space complexity solution for LeetCode 139
    #https://leetcode.com/problems/word-break/

    def wordBreak(self, s: str, wordDict) -> bool:
        cache = set()
        return self.wordBreakHelper(s, wordDict, cache)
        
    def wordBreakHelper(self, s: str, wordDict, cache) -> bool:
        if len(s) == 0:
            return True
        
        if len(s) in cache:
            return False

        for word in wordDict:
            if len(word) <= len(s) and s[:len(word)] == word:
                x = self.wordBreakHelper(s[len(word):], wordDict, cache)
                if x:
                    return True
                cache.add(len(s[len(word):]))

        return False
