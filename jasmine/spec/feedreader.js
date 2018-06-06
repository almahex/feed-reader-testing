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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test makes sure that every feed has a URL definied
         * and it is not empty.
         */
        it('have URL and is not empty', function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            }
        });

        /* This test makes sure that every feed has a name definied
         * and it is not empty.
         */
        it('have name and is not empty', function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            }
        });         
    });


    /* Test suite to validate the menu */
    describe('The menu', function() {

        /* By default, the menu must be hidden.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* When the menu is clicked it should be displayed and when
         * clicked again, it should be hidden.
         */ 
        it('displays when clicked', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });
        it('is hides when clicked again', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* Test suite to validate the initial entries of the feed */
    describe('Initial Entries', function() {
        /* Tests that it exists at least one entry inside the feed container
         * once the loadFeed function is executed.
         */ 
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });


        it('are loaded by the loadFeed function', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test suite to validate the feed selection */
    describe('New Feed Selection', function() {
        /* When the loadFeed function is executed, new feeds are added
         * to the feed container and the content of each feed is actually
         * different.
         */        
        beforeEach(function(done) {
            loadFeed(0, function() {
                // feed 0 done loading
                prevUrl = $('.feed').children()[0];
                loadFeed(1, function(){
                    // feed 1 done loading
                    newUrl = $('.feed').children()[1];
                    // all variables initialized, can begin tests
                    done();
                });
            });
        });


        it('changes the loaded content', function(done) {
            expect(prevUrl.innerHTML).not.toEqual(newUrl.innerHTML);
            done();
        });
    });

}());
