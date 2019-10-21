import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdicionaPage } from './adiciona.page';

describe('Tab2Page', () => {
  let component: AdicionaPage;
  let fixture: ComponentFixture<AdicionaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionaPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
