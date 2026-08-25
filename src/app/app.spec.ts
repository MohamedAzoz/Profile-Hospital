import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideTransloco } from '@jsverse/transloco';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideTransloco({
          config: {
            availableLangs: ['ar', 'en'],
            defaultLang: 'ar',
          },
          loader: { getTranslation: () => ({ subscribe: () => {} }) } as any,
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
