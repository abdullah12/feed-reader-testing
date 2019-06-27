/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*  test suite -
     the RSS feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /*
         * allFeeds is defined and not empty
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        })

        /*
         *  each feed url defined and not empty
         */
         it("allFeeds'URL are defined and not Empty",function(){
            for (let feed of allFeeds){
                expect(feed.url).toBeDefined() ;
                expect(feed.url.length).not.toBe(0) ;
            }
         })

        /*
         * each feed name defined and not empty
         */
        it("allFeeds'name are defined and not Empty",function(){
            for (let feed of allFeeds){
                expect(feed.name).toBeDefined() ;
                expect(feed.name.length).not.toBe(0) ;
            }
         })
    })

    /* menu test */
    describe('the menu',function(){
        let thebody
        beforeEach(function(){
            thebody = document.querySelector('body')
        })

        /*
         * test menu is hidden at the begining
         */

        it('is hidden', function() {

            expect(thebody.classList.contains('menu-hidden')).toBeTruthy()
        });

         /*
          * test menu is visible when clicked
          * and is back hidden when clicked again
          */
         it('should show and hide menu when clicked', function() {

            let theMenu = document.querySelector('.menu-icon-link')
             theMenu.click()
             expect(thebody.classList.contains('menu-hidden')).toBeFalsy()

             theMenu.click()
             expect(thebody.classList.contains('menu-hidden')).toBeTruthy()
          });
    })

    /* testing the Initial Entries */
    describe('Initial Entries',function(){
         /*
          * testing there should be an entry in the .feed element
         */
         beforeEach(function(done){
            loadFeed(0,done)
         })

         it('should be at least a single entry in the feed element with a class name entry',function(){
                let theEntries = document.querySelector('.feed').querySelectorAll('.entry')
                expect(theEntries.length).toBeGreaterThan(0)
         })
    })


    /* test suite: "New Feed Selection" */
    describe('New Feed Selection', function() {
        // testing to ensure when a new feed is loaded, the content of the feed change
        // by loading a first feed and saving the content
        // and reloading a new feed and compare to the first feed.
        let initialFeed,newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = document.querySelector('.feed').innerHTML
                loadFeed(1, function(){
                    newFeed=document.querySelector('.feed').innerHTML
                    done()
                })
            })
        })

        it('has a different content than previous one', function() {
            expect(initialFeed).not.toEqual(newFeed)
        })
    })
}());
