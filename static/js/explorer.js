;(function( _, $, App ){

    /// Variables: -------------------------------------------------------------

    var $explorer;

    /// Exports: ---------------------------------------------------------------

    App.Explorer = {
        show:   show,
    };

    /// Init: ------------------------------------------------------------------

    $( init );

    /// Functions: -------------------------------------------------------------

    function init() {

        $explorer = $( "#explorer" );
        show( "genres", App.StationList.getView() );
    };


    function show( name, $view ) {

        $explorer.find( '#'+name+' > .tabpanel' ).html( "" ).append( $view );
    };

})( window._, window.$, window.App );
