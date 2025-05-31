'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">movies-server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-b88ac7636c82f726fab4285290c79d73fab54ec950d8939c6a11fcaf7de3b99f8f2782d09231b69ba5ce50fcea295eed737fc078f5b10606e8048144ce0f6e33"' : 'data-bs-target="#xs-controllers-links-module-AppModule-b88ac7636c82f726fab4285290c79d73fab54ec950d8939c6a11fcaf7de3b99f8f2782d09231b69ba5ce50fcea295eed737fc078f5b10606e8048144ce0f6e33"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-b88ac7636c82f726fab4285290c79d73fab54ec950d8939c6a11fcaf7de3b99f8f2782d09231b69ba5ce50fcea295eed737fc078f5b10606e8048144ce0f6e33"' :
                                            'id="xs-controllers-links-module-AppModule-b88ac7636c82f726fab4285290c79d73fab54ec950d8939c6a11fcaf7de3b99f8f2782d09231b69ba5ce50fcea295eed737fc078f5b10606e8048144ce0f6e33"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-b88ac7636c82f726fab4285290c79d73fab54ec950d8939c6a11fcaf7de3b99f8f2782d09231b69ba5ce50fcea295eed737fc078f5b10606e8048144ce0f6e33"' : 'data-bs-target="#xs-injectables-links-module-AppModule-b88ac7636c82f726fab4285290c79d73fab54ec950d8939c6a11fcaf7de3b99f8f2782d09231b69ba5ce50fcea295eed737fc078f5b10606e8048144ce0f6e33"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b88ac7636c82f726fab4285290c79d73fab54ec950d8939c6a11fcaf7de3b99f8f2782d09231b69ba5ce50fcea295eed737fc078f5b10606e8048144ce0f6e33"' :
                                        'id="xs-injectables-links-module-AppModule-b88ac7636c82f726fab4285290c79d73fab54ec950d8939c6a11fcaf7de3b99f8f2782d09231b69ba5ce50fcea295eed737fc078f5b10606e8048144ce0f6e33"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-7185a0972cb9aa7ed0af5bc32446bf04febf44150753afe25d4a1f6fdf30546abfe6cd610b4bf4fc9dded56277f7079c50df9b8740e95bcf5c7d2f0386f27a79"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-7185a0972cb9aa7ed0af5bc32446bf04febf44150753afe25d4a1f6fdf30546abfe6cd610b4bf4fc9dded56277f7079c50df9b8740e95bcf5c7d2f0386f27a79"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-7185a0972cb9aa7ed0af5bc32446bf04febf44150753afe25d4a1f6fdf30546abfe6cd610b4bf4fc9dded56277f7079c50df9b8740e95bcf5c7d2f0386f27a79"' :
                                            'id="xs-controllers-links-module-AuthModule-7185a0972cb9aa7ed0af5bc32446bf04febf44150753afe25d4a1f6fdf30546abfe6cd610b4bf4fc9dded56277f7079c50df9b8740e95bcf5c7d2f0386f27a79"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-7185a0972cb9aa7ed0af5bc32446bf04febf44150753afe25d4a1f6fdf30546abfe6cd610b4bf4fc9dded56277f7079c50df9b8740e95bcf5c7d2f0386f27a79"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-7185a0972cb9aa7ed0af5bc32446bf04febf44150753afe25d4a1f6fdf30546abfe6cd610b4bf4fc9dded56277f7079c50df9b8740e95bcf5c7d2f0386f27a79"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7185a0972cb9aa7ed0af5bc32446bf04febf44150753afe25d4a1f6fdf30546abfe6cd610b4bf4fc9dded56277f7079c50df9b8740e95bcf5c7d2f0386f27a79"' :
                                        'id="xs-injectables-links-module-AuthModule-7185a0972cb9aa7ed0af5bc32446bf04febf44150753afe25d4a1f6fdf30546abfe6cd610b4bf4fc9dded56277f7079c50df9b8740e95bcf5c7d2f0386f27a79"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GenresModule.html" data-type="entity-link" >GenresModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GenresModule-7b4ea20dd3efddadf37dfa1248aa132d9b05142b829d72cb35c3416c8ef0c97d9ad5df1f095f0f9ce6e1f813d9f015f24a83fb1932e5391caf6e8d9717f99a1b"' : 'data-bs-target="#xs-controllers-links-module-GenresModule-7b4ea20dd3efddadf37dfa1248aa132d9b05142b829d72cb35c3416c8ef0c97d9ad5df1f095f0f9ce6e1f813d9f015f24a83fb1932e5391caf6e8d9717f99a1b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GenresModule-7b4ea20dd3efddadf37dfa1248aa132d9b05142b829d72cb35c3416c8ef0c97d9ad5df1f095f0f9ce6e1f813d9f015f24a83fb1932e5391caf6e8d9717f99a1b"' :
                                            'id="xs-controllers-links-module-GenresModule-7b4ea20dd3efddadf37dfa1248aa132d9b05142b829d72cb35c3416c8ef0c97d9ad5df1f095f0f9ce6e1f813d9f015f24a83fb1932e5391caf6e8d9717f99a1b"' }>
                                            <li class="link">
                                                <a href="controllers/GenresController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenresController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GenresModule-7b4ea20dd3efddadf37dfa1248aa132d9b05142b829d72cb35c3416c8ef0c97d9ad5df1f095f0f9ce6e1f813d9f015f24a83fb1932e5391caf6e8d9717f99a1b"' : 'data-bs-target="#xs-injectables-links-module-GenresModule-7b4ea20dd3efddadf37dfa1248aa132d9b05142b829d72cb35c3416c8ef0c97d9ad5df1f095f0f9ce6e1f813d9f015f24a83fb1932e5391caf6e8d9717f99a1b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GenresModule-7b4ea20dd3efddadf37dfa1248aa132d9b05142b829d72cb35c3416c8ef0c97d9ad5df1f095f0f9ce6e1f813d9f015f24a83fb1932e5391caf6e8d9717f99a1b"' :
                                        'id="xs-injectables-links-module-GenresModule-7b4ea20dd3efddadf37dfa1248aa132d9b05142b829d72cb35c3416c8ef0c97d9ad5df1f095f0f9ce6e1f813d9f015f24a83fb1932e5391caf6e8d9717f99a1b"' }>
                                        <li class="link">
                                            <a href="injectables/GenresService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenresService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MoviesModule.html" data-type="entity-link" >MoviesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MoviesModule-a809bf02667df101e4dd219fefa582116e03bb169f285e3cfd37b6837ba7312dc0666002125cfb9248a71d2d8050c15e8866bf0360a7f72795e9acbeb14de6e1"' : 'data-bs-target="#xs-controllers-links-module-MoviesModule-a809bf02667df101e4dd219fefa582116e03bb169f285e3cfd37b6837ba7312dc0666002125cfb9248a71d2d8050c15e8866bf0360a7f72795e9acbeb14de6e1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MoviesModule-a809bf02667df101e4dd219fefa582116e03bb169f285e3cfd37b6837ba7312dc0666002125cfb9248a71d2d8050c15e8866bf0360a7f72795e9acbeb14de6e1"' :
                                            'id="xs-controllers-links-module-MoviesModule-a809bf02667df101e4dd219fefa582116e03bb169f285e3cfd37b6837ba7312dc0666002125cfb9248a71d2d8050c15e8866bf0360a7f72795e9acbeb14de6e1"' }>
                                            <li class="link">
                                                <a href="controllers/MoviesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MoviesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MoviesModule-a809bf02667df101e4dd219fefa582116e03bb169f285e3cfd37b6837ba7312dc0666002125cfb9248a71d2d8050c15e8866bf0360a7f72795e9acbeb14de6e1"' : 'data-bs-target="#xs-injectables-links-module-MoviesModule-a809bf02667df101e4dd219fefa582116e03bb169f285e3cfd37b6837ba7312dc0666002125cfb9248a71d2d8050c15e8866bf0360a7f72795e9acbeb14de6e1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MoviesModule-a809bf02667df101e4dd219fefa582116e03bb169f285e3cfd37b6837ba7312dc0666002125cfb9248a71d2d8050c15e8866bf0360a7f72795e9acbeb14de6e1"' :
                                        'id="xs-injectables-links-module-MoviesModule-a809bf02667df101e4dd219fefa582116e03bb169f285e3cfd37b6837ba7312dc0666002125cfb9248a71d2d8050c15e8866bf0360a7f72795e9acbeb14de6e1"' }>
                                        <li class="link">
                                            <a href="injectables/MoviesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MoviesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-042c9a2a51d2c21f43fe963470e096a0eb8fb7234fd0e40c0cce03ffe180e514ec1fd857819d2dc14f9fe66d01387f1ced14809ffdf1216adcdc043d55ea15c1"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-042c9a2a51d2c21f43fe963470e096a0eb8fb7234fd0e40c0cce03ffe180e514ec1fd857819d2dc14f9fe66d01387f1ced14809ffdf1216adcdc043d55ea15c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-042c9a2a51d2c21f43fe963470e096a0eb8fb7234fd0e40c0cce03ffe180e514ec1fd857819d2dc14f9fe66d01387f1ced14809ffdf1216adcdc043d55ea15c1"' :
                                        'id="xs-injectables-links-module-PaginationModule-042c9a2a51d2c21f43fe963470e096a0eb8fb7234fd0e40c0cce03ffe180e514ec1fd857819d2dc14f9fe66d01387f1ced14809ffdf1216adcdc043d55ea15c1"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-9afc66d8a61bfe3224a2aeecacb907944e53915ba979de55e482969acaccf70972a56a3990d3d2b998c0ed4ebd6f093fbe0d1e08dc246cd6ca5109ae7e1da313"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-9afc66d8a61bfe3224a2aeecacb907944e53915ba979de55e482969acaccf70972a56a3990d3d2b998c0ed4ebd6f093fbe0d1e08dc246cd6ca5109ae7e1da313"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-9afc66d8a61bfe3224a2aeecacb907944e53915ba979de55e482969acaccf70972a56a3990d3d2b998c0ed4ebd6f093fbe0d1e08dc246cd6ca5109ae7e1da313"' :
                                            'id="xs-controllers-links-module-UsersModule-9afc66d8a61bfe3224a2aeecacb907944e53915ba979de55e482969acaccf70972a56a3990d3d2b998c0ed4ebd6f093fbe0d1e08dc246cd6ca5109ae7e1da313"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-9afc66d8a61bfe3224a2aeecacb907944e53915ba979de55e482969acaccf70972a56a3990d3d2b998c0ed4ebd6f093fbe0d1e08dc246cd6ca5109ae7e1da313"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-9afc66d8a61bfe3224a2aeecacb907944e53915ba979de55e482969acaccf70972a56a3990d3d2b998c0ed4ebd6f093fbe0d1e08dc246cd6ca5109ae7e1da313"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-9afc66d8a61bfe3224a2aeecacb907944e53915ba979de55e482969acaccf70972a56a3990d3d2b998c0ed4ebd6f093fbe0d1e08dc246cd6ca5109ae7e1da313"' :
                                        'id="xs-injectables-links-module-UsersModule-9afc66d8a61bfe3224a2aeecacb907944e53915ba979de55e482969acaccf70972a56a3990d3d2b998c0ed4ebd6f093fbe0d1e08dc246cd6ca5109ae7e1da313"' }>
                                        <li class="link">
                                            <a href="injectables/UsersCreateManyProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersCreateManyProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GenresController.html" data-type="entity-link" >GenresController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MoviesController.html" data-type="entity-link" >MoviesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Genre.html" data-type="entity-link" >Genre</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Movie.html" data-type="entity-link" >Movie</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateGenreDto.html" data-type="entity-link" >CreateGenreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManyUsersDto.html" data-type="entity-link" >CreateManyUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMovieDto.html" data-type="entity-link" >CreateMovieDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/getMoviesBaseDto.html" data-type="entity-link" >getMoviesBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetMoviesDto.html" data-type="entity-link" >GetMoviesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchGenreDto.html" data-type="entity-link" >PatchGenreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchMovieDto.html" data-type="entity-link" >PatchMovieDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GenresService.html" data-type="entity-link" >GenresService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MoviesService.html" data-type="entity-link" >MoviesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginationProvider.html" data-type="entity-link" >PaginationProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersCreateManyProvider.html" data-type="entity-link" >UsersCreateManyProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});