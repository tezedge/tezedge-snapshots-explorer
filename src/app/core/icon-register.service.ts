import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
export class IconRegisterService {

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) { }

  registerIcons(): void {
    this.iconRegistry.addSvgIconSet(this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/sprite/icon-set.svg`));
  }
}

function loadIcons(matIconService: IconRegisterService): Function {
  return () => matIconService.registerIcons();
}

export const ICONS_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: loadIcons,
  deps: [IconRegisterService],
  multi: true
};
