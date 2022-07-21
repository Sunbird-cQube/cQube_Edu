import { Translation, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco.http-loader';
import { environment } from 'src/environments/environment';

@NgModule({
    exports: [
        TranslocoModule
    ],
    providers: [
        {
            // Provide the default Transloco configuration
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: [
                    {
                        id: 'en',
                        label: 'English'
                    },
                    {
                        id: 'hindi',
                        label: 'Hindi'
                    }
                ],
                defaultLang: 'en',
                fallbackLang: 'en',
                reRenderOnLangChange: true,
                prodMode: environment.production
            })
        },
        {
            // Provide the default Transloco loader
            provide: TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader
        },
        {
            // Preload the default language before the app starts to prevent empty/jumping content
            provide: APP_INITIALIZER,
            deps: [TranslocoService],
            useFactory: (translocoService: TranslocoService): any => (): any => {
                const defaultLang = translocoService.getDefaultLang();
                translocoService.setActiveLang(defaultLang);
                return translocoService.load(defaultLang).toPromise();
            },
            multi: true
        }
    ]
})
export class TranslocoCoreModule {
}
