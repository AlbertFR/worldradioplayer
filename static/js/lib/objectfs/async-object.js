
;(function( window, _ ){

    /// Exports: ---------------------------------------------------------------

    window.ObjectFsAsyncObject = connect;

    /// Functions: -------------------------------------------------------------

    function connect( withObject ) {

        /// Exports: -----------------------------------------------------------

        return {
            read:       wrapFunction( read ),
            write:      wrapFunction( write ),
            remove:     wrapFunction( remove ),
            list:       wrapFunction( list ),
            count:      wrapFunction( count ),
            toObject:   wrapFunction( toObject ),
        };

        function wrapFunction( fn ) {
            return function() {
                
                var args = arguments;
                withObject( callFn );
                
                function callFn( err, dataObject ) {

                    if ( err ) {
                        var cb = args.pop();
                        _.isFunction( cb ) && cb( err, dataObject );
                    } else {
                        fn.apply( dataObject, args );
                    }
                };
            };
        };
    };

    function read( id, cb ) {

        var record = this[ id ];
        if ( record !== undefined ) {
            cb( null, record );
        } else {
            cb( "Not found.", record );
        }
    };


    function write( id, record, cb ) {

        this[id] = record;
        cb( null, record );
    };


    function remove( id, cb ) {

        var record =    this[ id ];
        if ( record === undefined ) {
            cb( "Not found.", record );
        } else {
            delete this[id];
            cb( null, record );
        }
    };

    function list( filter, options, cb ) {

        try {
            var results =   _.values( this );
            if ( filter ) {
                results =   results.filter( ObjectFsUtils.itemFilter( filter ));
            } 
            if ( options ) {
                results =   ObjectFsUtils.applyOptions( results, options );
            }
            cb && cb( null, results );
        } catch ( e ) {
            cb && cb( e, results );
        }
    };

    function count( filter, options, cb ) {

        this.list( filter, options, function( err, results ){
            cb( err, results && results.count );
        });
    };

    function toObject( cb ) {
        cb && cb( null, this );
        return this;
    };


})( window, window._ );