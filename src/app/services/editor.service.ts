import { Injectable } from '@angular/core';
import interact from 'interactjs';

@Injectable({
    providedIn: 'root'
  })
  export class EditorService {

  public grados;
  public idDesign
  constructor() {
    var design = JSON.parse(sessionStorage.getItem('design'))
    if (design) {
      this.idDesign = design.idDesign
    }
    }

    elemEditable(){
        interact('.elemento')
        .on('tap', function (evento) {
          let target = $(".elemento").hasClass('seleccionado');
          if ( target ){
              $(".elemento").removeClass('seleccionado');
              $(".editBox").slideToggle( );
              $("#cajaCrear").slideToggle();
          } else {
            evento.currentTarget.classList.toggle('seleccionado');
            evento.preventDefault();
            $(".editBox").slideToggle( );
            $("#cajaCrear").slideToggle();
          }
        });

        interact('.intext')
        .on('tap', function (evento){
          let dis = $(".intext textarea").is('[disabled]');
          let target = $(".intext").hasClass('seleccionado');
          if ( target == false ){
            evento.currentTarget.classList.toggle('seleccionado');
            $(".textBox").slideToggle( );
            $("#cajaTextos").slideToggle();
          } else if ( target && dis ){
            $(".intext textarea").removeAttr('disabled');
          } else {}
        });

        interact('.imagenEl')
        .on('tap', function (evento) {
          let target = $(".imagenEl").hasClass('seleccionado');
          if ( target ){
              $(".imagenEl").removeClass('seleccionado');
              $(".filtroBox").slideToggle( );
              $("#cajaImagen").slideToggle();
          } else {
            evento.currentTarget.classList.toggle('seleccionado');
            evento.preventDefault();
            $(".filtroBox").slideToggle( );
            $("#cajaImagen").slideToggle();
          }
        });
              
        interact(".seleccionado").draggable({
            modifiers: [
              interact.modifiers.restrict({
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
              }),
            ],
            onmove: dragMoveListener,
            onstart: onload,
          });

          function dragMoveListener (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy,
                degs = (parseFloat(target.getAttribute('degs')) || 0 );

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px) rotate('+ degs + 'deg)';
        
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            
            var design = JSON.parse(sessionStorage.getItem('design'))
            var idDesign = design.idDesign
            var html = $("#espacio").html()
            sessionStorage.setItem('design', JSON.stringify({
                    idDesign: idDesign,
                    html: html
                  }))

          }
      
          interact(".seleccionado").resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            modifiers: [
              interact.modifiers.restrictEdges({
                endOnly: true,
              }),
              interact.modifiers.restrictSize({
                min: { width: 10, height: 5 },
              }),
            ],
            inertia: true,
            onmove: resizemove,
          });

          function resizemove (event) {
            var target = event.target,
            degs = (parseFloat(target.getAttribute('degs')) || 0 ),
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px) rotate('+ degs + 'deg)';
            
            target.style.width  = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';
        
            x += event.deltaRect.left;
            y += event.deltaRect.top;
        
        
            target.setAttribute('degs', degs);
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            
            var design = JSON.parse(sessionStorage.getItem('design'))
            var idDesign = design.idDesign
            var html = $("#espacio").html()
            sessionStorage.setItem('design', JSON.stringify({
                    idDesign: idDesign,
                    html: html
                  }))
        }
    }

    rotate(val){
      var item = $(".seleccionado");
      item.attr('degs', val);
      item.css('transform', 'rotate('+val+'deg)');
      
      var x = parseFloat(item.attr('data-x')),
      y = parseFloat(item.attr('data-y')),
      d = parseFloat(item.attr('degs')),
      w = parseFloat(item.css('width')),
      h = parseFloat(item.css('height'));

      item.css('width', w);
      item.css('height', h);
      item.css('transform', 'translate('+x+'px, '+y+'px) rotate('+val+'deg)');
        this.historial()
    }

    color(val){
      $(".seleccionado div").css('background', val);
      $(".seleccionado div").css('border', 'solid 2px ' + val);
      this.historial()
    }

    subirCapa(){
      var z = parseFloat($(".seleccionado").css('z-index'));
      var upZ = z+1;
      $(".seleccionado").css('z-index', upZ);
      this.historial()
    }

    bajarCapa(){
      var z = parseFloat($(".seleccionado").css('z-index'));
      if( z >= 2) {
        var downZ = z-1;
      } else {
        var downZ = z
      }
      $(".seleccionado").css('z-index', downZ);
      this.historial()
    }

    copy(){
      $(".seleccionado").clone(true).appendTo("#espacio");
      this.historial()
    }

    borrar(){
      $(".seleccionado").remove();
      $(".editBox").slideToggle();
      $("#cajaCrear").slideToggle();
      $(".textBox").slideToggle();
      $("#cajaTextos").slideToggle();
      $(".filtroBox").slideToggle();
      $("#cajaImagen").slideToggle();
      this.historial()
  }
  
  historial() {
    var html = $("#espacio").html()
    sessionStorage.setItem('design', JSON.stringify({
            idDesign: this.idDesign,
            html: html
          }))
  }

  }