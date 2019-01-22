#!/usr/local/bin/python
# -*- coding: utf-8 -*-
Menus = [
    {
        "name": "Common"
    },
    {
        "name": "Winter special"
    },
    {
        "name": "Summer special"
    },
    {
        "name": "Authem special"
    },
    {
        "name": "Spring special"
    }
]
Categories = [
    {
        "name": "Soup"  # 1
    },
    {
        "name": "Hot"  # 2
    },
    {
        "name": "Coctails"  # 3
    },
    {
        "name": "Hard liquer"  # 6
    },
    {
        "name": "With beer"  # 7
    },
    {
        "name": "Pizza"  # 8
    },
    {
        "name": "Salats"  # 9
    },
    {
        "name": "Bakery"  # 11
    },
    {
        "name": "Meat"  # 12
    },
    {
        "name": "Pasta"  # 13
    }
]
Meals = [
    {
        "name": "Spiced carrot & lentil soup",
        "description": "A delicious, spicy blend, packed full of iron and low fat to boot",
        "ingredients": "cumin seeds, chilli flakes, olive oil, carrots, red lentils, vegetable stock, milk, yogurt, bread",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1074500_11.jpg?itok=IwEifJO_"
    },
    {
        "name": "Pumpkin soup",
        "description": "Whip up this easy pumpkin soup as a starter for a dinner party or a light supper when you need a bit of comfort – it has a lovely silky texture",
        "ingredients": "olive oil, onions, pumpkin, vegetable stock, double cream, bread",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--879453_11.jpg?itok=unHBDg-O"
    },
    {
        "name": "Mushroom & potato soup",
        "description": "Porcini mushrooms give this healthy soup a real umami flavour boost. Pour into a flask for a warming, low-calorie lunch that you can take to work",
        "ingredients": "rapeseed oil, onions, dried porcini mushrooms, vegetable bouillon powder, chestnut mushrooms, garlic, potato, thyme, carrots, parsley, bio yogurt, walnut",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/mushroom-potato-soup-440-400.jpg?itok=VnlilJ7y"
    },
    {
        "name": "Chicken noodle soup",
        "description": "Mary Cadogan's aromatic broth will warm you up on a winter's evening - it contains ginger, which is particularly good for colds, too",
        "ingredients": "chicken stock, chicken, ginger, clove, wheat noodles, sweetcorn, mushrooms, spring onions, soy sauce, basil leaves",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1035613_10.jpg?itok=KYNwhkXX"
    },
    {
        "name": "Tomato soup",
        "description": "To make the tastiest tomato soup you’ll ever experience wait until the tomatoes are at their most ripe and juicy, around September",
        "ingredients": "tomatoes, onion, carrot, celery, olive oil, tomato purée, sugar, bay, vegetable stock, basil leaves",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1116452_11.jpg?itok=xRuZCCN0"
    },
    {
        "name": "Chicken & chorizo jambalaya",
        "description": "A Cajun-inspired rice pot recipe with spicy Spanish sausage, sweet peppers and tomatoes",
        "ingredients": "olive oil, chicken breasts, onion, red pepper, garlic,  chorizo, Cajun, rice, tomato, chicken stock",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1074500_11.jpg?itok=IwEifJO_"
    },
    {
        "name": "Chicken & chorizo jambalaya",
        "ingredients": "1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 2 chicken breasts, chopped, 1 onion, diced Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 1 red pepper, thinly sliced, 2 garlic cloves, crushed, 75g chorizo, sliced Chorizo chore-reeth-ohA coarsely textured spiced pork sausage widely used in Spanish and Mexican cooking. It is made… , 1 tbsp Cajun seasoning, 250g long grain rice, 400g can plum tomato, 350ml chicken stock",
        "description": "A Cajun-inspired rice pot recipe with spicy Spanish sausage, sweet peppers and tomatoes",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1274503_8.jpg?itok=y2r-R0BV"
    },
    {
        "name": "Spicy root & lentil casserole",
        "ingredients": "2 tbsp sunflower or vegetable oil, 1 onion, chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 2 garlic clove, crushed, 700g potatoes, peeled and cut into chunks Potato po-tate-ohThe world's favourite root vegetable, the potato comes in innumerable varieties. A member of… , 4 carrot, thickly sliced Carrot ka-rotThe carrot, with its distinctive bright orange colour, is one of the most versatile root… , 2 parsnip, thickly sliced Parsnip par-snip The fact that the parsnip is a member of the carrot family comes as no surprise - it looks just… , 2 tbsp curry paste or powder, 1 litre/1¾ pints vegetable stock, 100g red lentils Lentils len-tilThe lentil plant (Lens Culinaris) originates from Asia and North Africa and is one of our oldest… , a small bunch of fresh coriander, roughly chopped, low-fat yogurt and naan bread, to serve Yogurt yog-ertYogurt is made by adding a number of types of harmless bacteria to milk, causing it to ferment.… ",
        "description": "The potatoes in this recipe take on the spicy flavours beautifully - our idea of the perfect veggie supper",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--488691_11.jpg?itok=ExaTspz1"
    },
    {
        "name": "Summer-in-winter chicken",
        "ingredients": "1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 4 boneless skinless chicken breasts, 200g pack cherry tomatoes, 3 tbsp pesto Pesto Pess-tohPesto is a generic Italian name for any sauce made by pounding ingredients together.The… , 3 tbsp crème fraîche (half fat is fine), fresh basil, if you have it Basil ba-zilMost closely associated with Mediterranean cooking but also very prevalent in Asian food, the… ",
        "description": "Pining for summer? This simply seasoned chicken fried with beautiful, ripe, cherry tomatoes in a creamy sauce is guaranteed to hit the spot. Add a dollop of pesto for an extra layer of nutty flavours",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1035651_10.jpg?itok=4Sn11UC2"
    },
    {
        "name": "Mustard-stuffed chicken",
        "ingredients": "125g ball mozzarella, torn into small pieces, 50g strong cheddar, grated Cheddar Ched-ahOnce cheddar was 'Cheddar', a large, hard-pressed barrel of cheese made by a particular… , 1 tbsp wholegrain mustard, 4 skinless boneless chicken breast fillets, 8 smoked streaky bacon rashers",
        "description": "This is so good we'd be surprised if this chicken fillet recipe doesn't become a firm favourite. Save it to your My Good Food collection and enjoy",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1274488_8.jpg?itok=vS12pL7b"
    },
    {
        "name": "Chicken biryani",
        "ingredients": "300g basmati rice, 25g butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 1 large onion, finely sliced Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 1 bay leaf, 3 cardamom pods, small cinnamon stick, 1 tsp turmeric Turmeric term-er-ikTurmeric is a fragrant, bright golden-yellow root that is most commonly seen and used dried and… , 4 skinless chicken breasts, cut into large chunks, 4 tbsp curry paste (we used Patak's balti paste), 85g raisins, 850ml chicken stock, 30g coriander, ½ chopped, ½ leaves picked and 2 tbsp toasted flaked almonds, to serve",
        "description": "A great one-pot rice dish that can still be served up a few days later, perfect for leftovers",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--328452_12.jpg?itok=U8ngdhdS"
    },
    {
        "name": "Falafel burgers",
        "ingredients": "400g can chickpea, rinsed and drained, 1 small red onion, roughly chopped, 1 garlic clove, chopped, handful of flat-leaf parsley or curly parsley, 1 tsp ground cumin Cumin q-minAn aromatic spice native to eastern Mediteranean countries and Upper Egypt. This warm,… , 1 tsp ground coriander, 1⁄2 tsp harissa paste or chilli powder, 2 tbsp plain flour, 2 tbsp sunflower oil Sunflower oilA variety of oils can be used for baking. Sunflower is the one we use most often at Good Food as… , toasted pitta bread, to serve, 200g tub tomato salsa, to serve, green salad, to serve",
        "description": "A healthy burger that's filling too. These are great for anyone who craves a big bite but doesn't want the calories",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/01/recipe-image-legacy-id--326597_11.jpg?itok=0bBEqeae"
    },
    {
        "name": "Creamy courgette lasagne",
        "ingredients": "9 dried lasagne sheets, 1 tbsp sunflower oil Sunflower oilA variety of oils can be used for baking. Sunflower is the one we use most often at Good Food as… , 1 onion, finely chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 700g courgette (about 6), coarsely grated Courgette corr-zjetThe courgette is a variety of cucurtbit, which means it's from the same family as cucumber,… , 2 garlic cloves, crushed, 250g tub ricotta Ricotta ree-cot-aRicotta is an Italian cheese made from whey and traditionally a by-product of… , 50g cheddar Cheddar Ched-ahOnce cheddar was 'Cheddar', a large, hard-pressed barrel of cheese made by a particular… , 350g jar tomato sauce for pasta",
        "description": "Serve up this creamy quick dish for a last minute dinner party and impress veggie friends",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1273575_8.jpg?itok=dBBt-qP6"
    },
    {
        "name": "Veggie shepherd's pie with sweet potato mash",
        "ingredients": "1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 1 large onion, halved and sliced Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 2 large carrots (500g/1lb 2oz in total), cut into sugar-cube size pieces Carrot ka-rotThe carrot, with its distinctive bright orange colour, is one of the most versatile root… , 2 tbsp thyme chopped ThymeThis popular herb grows in Europe, especially the Mediterranean, and is a member of the mint… , 200ml red wine, 400g can chopped tomatoes, 2 vegetable stock cubes, 410g can green lentils Lentils len-tilThe lentil plant (Lens Culinaris) originates from Asia and North Africa and is one of our oldest… , 950g sweet potatoes, peeled and cut into chunks Sweet potato sweet po-tate-toeSweet potatoes have a creamy texture and a sweet-spicy flavour that makes them ideal for savoury… , 25g butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 85g vegetarian mature cheddar, grated",
        "description": "The secret to this shepherd's pie’s filling is to choose big carrots so they don’t lose their texture when cooked",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--560451_11.jpg?itok=ma2pok11"
    },
    {
        "name": "Cottage pie",
        "ingredients": "3 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 1¼kg beef mince, 2 onions, finely chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 3 carrots, chopped Carrot ka-rotThe carrot, with its distinctive bright orange colour, is one of the most versatile root… , 3 celery sticks, chopped Celery sell-er-eeA collection of long, thick, juicy stalks around a central, tender heart, celery ranges in… , 2 garlic cloves, finely chopped, 3 tbsp plain flour, 1 tbsp tomato purée, large glass red wine (optional), 850ml beef stock, 4 tbsp Worcestershire sauce, few thyme sprigs ThymeThis popular herb grows in Europe, especially the Mediterranean, and is a member of the mint… , 2 bay leaves, 1.8kg potatoes, chopped Potato po-tate-ohThe world's favourite root vegetable, the potato comes in innumerable varieties. A member of… , 225ml milk Milk mill-kOne of the most widely used ingredients, milk is often referred to as a complete food. While cow… , 25g butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 200g strong cheddar, grated Cheddar Ched-ahOnce cheddar was 'Cheddar', a large, hard-pressed barrel of cheese made by a particular… , freshly grated nutmeg Nutmeg nut-megOne of the most useful of spices for both sweet and savoury… ",
        "description": "This great-value family favourite freezes beautifully and is a guaranteed crowd-pleaser",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1074465_10.jpg?itok=Zwn8Cd-1"
    },
    {
        "name": "Chicken, sweet potato & coconut curry",
        "ingredients": "1 tbsp sunflower oil Sunflower oilA variety of oils can be used for baking. Sunflower is the one we use most often at Good Food as… , 2 tsp mild curry paste, 2 large boneless, skinless chicken breasts, cut into bite-size pieces, 2 medium-sized sweet potatoes, peeled and cut into bite-size pieces Sweet potato sweet po-tate-toeSweet potatoes have a creamy texture and a sweet-spicy flavour that makes them ideal for savoury… , 4 tbsp red split lentils Lentils len-tilThe lentil plant (Lens Culinaris) originates from Asia and North Africa and is one of our oldest… , 300ml chicken stock, 400ml can coconut milk Coconut milk ko-ko-nut mill-kCoconut milk is not the slightly opaque liquid that flows from a freshly opened coconut –… , 175g frozen peas Peas p-eesA type of legume, peas grow inside long, plump pods. As is the case with all types of legume,… ",
        "description": "Serve this mildly spiced curry with rice noodles, basmati rice or chappati breads and introduce your kids to curry",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1035630_11.jpg?itok=VHXc71xK"
    },
    {
        "name": "Home-style chicken curry",
        "ingredients": "1 large onion Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 6 garlic cloves, roughly chopped, 50g ginger, roughly chopped Ginger jin-jerMainly grown in Jamaica, Africa, India, China and Australia, ginger is the root of the plant. It… , 4 tbsp vegetable oil, 2 tsp cumin seeds, 1 tsp fennel seeds Fennel seeds feh-nell seedsA dried seed that comes from the fennel herb, fennel seeds look like cumin seeds, only greener,… , 5cm cinnamon stick, 1 tsp chilli flakes, 1 tsp garam masala Garam masala gar-am mah-sarl-ahMeaning 'warming spice mix', garam masala is the main spice blend used in North Indian… , 1 tsp turmeric Turmeric term-er-ikTurmeric is a fragrant, bright golden-yellow root that is most commonly seen and used dried and… , 1 tsp caster sugar, 400g can chopped tomatoes, 8 chicken thighs, skinned, boneless (about 800g), 250ml hot chicken stock, 2 tbsp chopped coriander",
        "description": "A rustic and authentic quick Indian one-pot packed with tonnes of hot Asian spices and fragrant coriander",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--908515_10.jpg?itok=rhm4Vwap"
    },
    {
        "name": "Oven-baked risotto",
        "ingredients": "250g pack smoked bacon, chopped into small pieces, 1 onion, chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 25g butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 300g risotto rice Risotto riceTo create an authentic creamy Italian risotto, the use of specialist rice is imperative. It… , half a glass of white wine (optional), 150g pack cherry tomatoes, halved, 700ml hot chicken stock (from a cube is fine), 50g parmesan, grated Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… ",
        "description": "Cook this simple storecupboard risotto in the oven while you get on with something else – the result is still wonderfully creamy",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2013/05/recipe-image-legacy-id--373498_11.jpg?itok=CY0PyoMs"
    },
    {
        "name": "Sweet potato & butternut squash soup with lemon & garlic toast",
        "ingredients": "500g sweet potatoes, peeled and diced Sweet potato sweet po-tate-toeSweet potatoes have a creamy texture and a sweet-spicy flavour that makes them ideal for savoury… , 1 butternut squash, peeled, deseeded and diced, 1 tbsp clear honey, 1 tbsp olive oil, plus a drizzle Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 2 onions, roughly chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 3 garlic cloves, crushed, 1l vegetable or chicken stock, 1 tsp cinnamon Cinnamon sin-ah-munA fragrant spice which comes from the inner bark of a tropical tree. When dried, it curls into… , 1 tsp grated nutmeg, 100ml double cream, 1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 3 garlic cloves, crushed, 100g butter, at room temperature Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , zest 1 lemon Lemon le-monOval in shape, with a pronouced bulge on one end, lemons are one of the most versatile fruits… , 2 tbsp snipped chives, 1 tbsp chopped thyme ThymeThis popular herb grows in Europe, especially the Mediterranean, and is a member of the mint… , 2 ciabatta loaves, cut into slices",
        "description": "Roast your vegetables in honey before blitzing into this velvety smooth, spiced soup - served with garlicky, zesty ciabatta slices for dipping",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/sweet-potato-butternut-squash-soup-with-lemon-garlic-toast.jpg?itok=g5LkgnqZ"
    },
    {
        "name": "Beef & vegetable casserole",
        "ingredients": "2 celery sticks, thickly sliced Celery sell-er-eeA collection of long, thick, juicy stalks around a central, tender heart, celery ranges in… , 1 onion, chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 2 really big carrots, halved lengthways then very chunkily sliced Carrot ka-rotThe carrot, with its distinctive bright orange colour, is one of the most versatile root… , 5 bay leaves, 2 thyme sprigs, 1 whole and 1 leaves picked ThymeThis popular herb grows in Europe, especially the Mediterranean, and is a member of the mint… , 1 tbsp vegetable oil, 1 tbsp butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 2 tbsp plain flour, 2 tbsp tomato purée, 2 tbsp Worcestershire sauce, 2 beef stock cubes, crumbled, 850g stewing beef (featherblade or brisket works nicely), cut into nice large chunks",
        "description": "A traditional braised beef stew with thick, rich gravy – an ideal recipe for cheap cuts as slow-cooking guarantees a tender dish",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--890477_11.jpg?itok=aYnDFCNC"
    },
    {
        "name": "Persian lamb tagine",
        "ingredients": "2kg lamb neck fillets, 5 tbsp mild olive oil or sunflower oil Sunflower oilA variety of oils can be used for baking. Sunflower is the one we use most often at Good Food as… , 3 medium onions, cut into thin wedges Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 4 garlic cloves, finely chopped, 4 tsp ground cumin, 4 tsp ground coriander, 1 tsp hot chilli powder, 1 tsp ground turmeric, large pinch of saffron Saffron sah-fronThe stigma of a type of crocus, saffron threads have a pungent and distinctive aroma and flavour… , 2 cinnamon sticks, 2 preserved lemons (from a jar), drained and cut into thin wedges, 300g ready-to-eat dried apricot, 250g ready-to-eat dried pitted dates Date da-ateDates are one of the oldest cultivated fruits - it's thought that they were a staple part of… , 100g shelled pistachios, 2 tsp rosewater, 25g cornflour, small bunch coriander, leaves roughly chopped, cooked couscous or basmati rice, to serve Couscous koos-koosConsisting of many tiny granules made from steamed and dried durum wheat, couscous has become a… ",
        "description": "This warming stew is spiced with cinnamon and cumin, and sweetened with apricots and dates - perfect with fluffy couscous",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/persian-lamb-tagine.jpg?itok=TCiGHDSa"
    },
    {
        "name": "Chicken & ham lasagne",
        "ingredients": "6 boneless skinless chicken breasts (around 700g), ½ medium onion, sliced Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 2 bay leaves, 200ml white wine, 100g butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 100g plain flour, 500ml semi-skimmed milk, 140g sliced smoked ham, cut into strips, 200g young spinach leaves Spinach spin-atchUsed in almost every cuisine across the world, spinach is an enormously popular green vegetable… , 225g no pre-cook dried lasagne sheets (about 20 sheets), 200g ready-grated mozzarella, 25g parmesan, finely grated Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… ",
        "description": "This comforting dish of layered pasta sheets, meat and spinach is topped with gooey, melted cheese - freeze now for entertaining later",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/chicken-ham-lasagne.jpg?itok=p57jUuoL"
    },
    {
        "name": "Leek & potato soup",
        "ingredients": "50g butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 450g potatoes, peeled and cut into 1cm pieces (try Golden Wonders or Kerr Pinks) Potato po-tate-ohThe world's favourite root vegetable, the potato comes in innumerable varieties. A member of… , 1 small onion, cut the same size as the potatoes Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 450g white parts of leeks, sliced (save the green tops for another soup or stock) Leek lee-kLike garlic and onion, leeks are a member of the allium family, but have their own distinct… , 850ml-1.2litres/1½-2pts light chicken or vegetable stock Chicken chik-enChicken's many plus points - its versatility, as well as the ease and speed with which it… , 142ml carton whipping cream, 125ml full-fat milk Milk mill-kOne of the most widely used ingredients, milk is often referred to as a complete food. While cow… , the white part of 1 leek Leek lee-kLike garlic and onion, leeks are a member of the allium family, but have their own distinct… , a small knob of butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , finely chopped chives",
        "description": "Of the winter soups, leek and potato is one of the most comforting and familiar - and Darina Allen's makes the most of seasonal, local veg",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--22567_12.jpg?itok=39HRmanI"
    },
    {
        "name": "Winter root mash with buttery crumbs",
        "ingredients": "650g parsnips, cut into even chunks Parsnip par-snip The fact that the parsnip is a member of the carrot family comes as no surprise - it looks just… , 650g swede, cut into same size chunks as the parsnips Swede sw-ee-dA member of the cabbage family, the swede is often confused with the turnip, though they look… , 142ml tub soured cream, 1 rounded tbsp hot horseradish (English Provender is good) Horseradish hors rad-ishHorseradish root is larger than an ordinary radish, and has a hot, peppery flavour.It… , 2 tbsp fresh thyme leaves ThymeThis popular herb grows in Europe, especially the Mediterranean, and is a member of the mint… , butter, for greasing Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 50g butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 1 small onion, finely chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 50g fresh white breadcrumbs (from about 4 slices), a small handful thyme leaves, plus extra for scattering ThymeThis popular herb grows in Europe, especially the Mediterranean, and is a member of the mint… , 25g parmesan, coarsely grated Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… ",
        "description": "A little bit of this winter root mash goes a long way - make it a day ahead and cut the stress on Christmas Day",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--442476_12.jpg?itok=2HBOr2Xd"
    },
    {
        "name": "Summer-in-winter chicken",
        "ingredients": "1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 4 boneless skinless chicken breasts, 200g pack cherry tomatoes, 3 tbsp pesto Pesto Pess-tohPesto is a generic Italian name for any sauce made by pounding ingredients together.The… , 3 tbsp crème fraîche (half fat is fine), fresh basil, if you have it Basil ba-zilMost closely associated with Mediterranean cooking but also very prevalent in Asian food, the… ",
        "description": "Pining for summer? This simply seasoned chicken fried with beautiful, ripe, cherry tomatoes in a creamy sauce is guaranteed to hit the spot. Add a dollop of pesto for an extra layer of nutty flavours",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1035651_10.jpg?itok=4Sn11UC2"
    },
    {
        "name": "Honeyed winter salad",
        "ingredients": "1 butternut squash, cut into thin wedges, 2 red onions, halved and cut into wedges, 4 parsnips, cut into wedges Parsnip par-snip The fact that the parsnip is a member of the carrot family comes as no surprise - it looks just… , 3 tbsp olive oil (try garlic or basil infused) Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 1-2 tbsp clear honey, 1 small ciabatta, roughly torn into pieces (tomato and olive ciabatta works well), 1 tbsp sunflower seeds, optional, 225g bag leaf spinach Spinach spin-atchUsed in almost every cuisine across the world, spinach is an enormously popular green vegetable… , 2 tbsp white wine vinegar, 1 tsp Dijon mustard",
        "description": "Bring summer to winter with this fresh salad - it contains 3 of your 5-a-day too",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--441463_11.jpg?itok=e-Jr9nHn"
    },
    {
        "name": "Mustard chicken with winter vegetables",
        "ingredients": "1 chicken, about 1.8kg/4lb in weight Chicken chik-enChicken's many plus points - its versatility, as well as the ease and speed with which it… , 2 onions Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 6 celery sticks Celery sell-er-eeA collection of long, thick, juicy stalks around a central, tender heart, celery ranges in… , 6 carrots Carrot ka-rotThe carrot, with its distinctive bright orange colour, is one of the most versatile root… , 2 bay leaves, 2 thyme sprigs ThymeThis popular herb grows in Europe, especially the Mediterranean, and is a member of the mint… , 1 tsp black peppercorn, 50g butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 100g smoked bacon lardons Bacon bay-konBacon is pork that has been cured one of two ways: dry or wet. It can be bought as both rashers… , 3 small turnips, peeled and cut into wedges Turnip tern-ipTurnips are creamy-white with a lovely purple, red or greenish upper part where the taproot has… , 1 tbsp plain flour, 2 tbsp wholegrain mustard, 3 rounded tbsp crème fraîche, good handful parsley, chopped Parsley par-sleeOne of the most ubiquitous herbs in British cookery, parsley is also popular in European and… ",
        "description": "This is a great way to make a chicken go further, and the mustard gives it that little kick",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--513835_11.jpg?itok=e4xXjk3w"
    },
    {
        "name": "Quinoa with stir-fried winter veg",
        "ingredients": "200g quinoa Quinoa keen-wahTiny, bead-shaped, with a slightly bitter flavour and firm texture, quinoa may not be a… , 5 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 2 garlic cloves, finely chopped, 3 carrots, cut into thin sticks Carrot ka-rotThe carrot, with its distinctive bright orange colour, is one of the most versatile root… , 300g leek, sliced Leek lee-kLike garlic and onion, leeks are a member of the allium family, but have their own distinct… , 300g broccoli, cut into small florets Broccoli brok-o-leeLike cabbage and cauliflower, broccoli is a brassica and is sometimes known by its Italian name… , 100g sundried tomato, drained and chopped, 200ml vegetable stock, 2 tsp tomato purée, juice 1 lemon Lemon le-monOval in shape, with a pronouced bulge on one end, lemons are one of the most versatile fruits… ",
        "description": "Quinoa is protein-rich, low-fat, gluten-free and makes a nutritious change from rice or pasta",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--279536_10.jpg?itok=HYC_thcT"
    },
    {
        "name": "Winter tuna Niçoise",
        "ingredients": "450g waxy potatoes, unpeeled and thickly sliced Potato po-tate-ohThe world's favourite root vegetable, the potato comes in innumerable varieties. A member of… , 2 tbsp plus 2 tsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 4 eggs Egg eggThe ultimate convenience food, eggs are powerhouses of nutrition, packed with protein and a… , 1 tbsp red wine vinegar, 2 tbsp caper, rinsed Capers kay-perCapers are the small flower buds of the Capparis shrub, which grows in the Mediterranean. As… , 50g SunBlush or sundried tomato in oil, finely chopped, ½ red onion, thinly sliced, 100g baby spinach, 2 x 160g or 200g cans yellowfin tuna steak in springwater, drained",
        "description": "This colourful salad makes the most of storecupboard ingredients - vary it for a special occasion by using fresh tuna",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--19038_11.jpg?itok=gdUcBO4Y"
    },
    {
        "name": "Chicken roasted with winter root vegetables",
        "ingredients": "1 small celeriac, peeled and cut into 2½ cm/1in chunks Celeriac sell-air-e-akThe unsung hero of the vegetable world, knobbly, odd-shaped celeriac has a subtle, celery-like… , 400g swede, peeled and cut into 2½ cm/1in chunks Swede sw-ee-dA member of the cabbage family, the swede is often confused with the turnip, though they look… , 2 large sweet potatoes, scrubbed and cut into 2½ cm/1in chunks Sweet potato sweet po-tate-toeSweet potatoes have a creamy texture and a sweet-spicy flavour that makes them ideal for savoury… , 2 medium parsnips, scrubbed and quartered lengthways Parsnip par-snip The fact that the parsnip is a member of the carrot family comes as no surprise - it looks just… , 2 large garlic cloves, thinly sliced, 2 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , ½ tsp cumin seeds, a few sprigs of sage Sage sa-agePopular in both Italian and British cookery, sage has long, grey-green leaves with a slightly… , 4 skinless boneless chicken breast fillets, weighing about 140g/5oz each, 4 slices prosciutto Prosciutto proh-shoo-toeProsciutto is sweet, delicate ham intended to be eaten raw. The word 'prosciutto' is the… ",
        "description": "Prosciutto and chicken is a luxurious combination - and this version is good for you as well - high in fibre, vitamin C and folic acid",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--796_12.jpg?itok=t5GGycJM"
    },
    {
        "name": "Winter fruit salad",
        "ingredients": "600g good-quality ready-to-eat dried fruit (such as prunes, pears, apricots, figs cranberries), 3 tbsp clear honey Honey huh-neeHoney is made by bees from the nectar they collect from flowers. Viscous and fragrant, it's… , 1 vanilla pod, split lengthways, 1 Earl Grey tea bag, 1 tbsp fresh lemon juice, mascarpone or Greek yogurt, to serve",
        "description": "Make the most of autumnal fruits in this refreshing and nourishing salad - make a batch and eat during the week",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--195622_11.jpg?itok=vghxd92T"
    },
    {
        "name": "Chicken noodle soup",
        "ingredients": "900ml chicken or vegetable stock (or Miso soup mix) Chicken chik-enChicken's many plus points - its versatility, as well as the ease and speed with which it… , 1 boneless, skinless chicken breast, about 175g/6oz, 1 tsp chopped fresh root ginger, 1 garlic clove, finely chopped, 50g rice or wheat noodles Rice r-eye-sRice is a grain, the seed of a type of grass, which is the most widely grown and the most… , 2 tbsp sweetcorn, canned or frozen Sweetcorn sw-eet cornAlso known as corn on the cob, sweetcorn is composed of rows of tightly packed golden yellow… , 2-3 mushrooms, thinly sliced Mushroom mush-roomThe mushroom is a fungus which comes in a wide range of varieties that belong to two distinct… , 2 spring onions, shredded Spring onion sp-ring un-yunAlso known as scallions or green onions, spring onions are in fact very young onions, harvested… , 2 tsp soy sauce, plus extra for serving Soy sauce soy sor-sAn Asian condiment and ingredient that comes in a variety of of varieties ranging from light to… , mint or basil leaves and a little shredded chilli (optional), to serve Mint mi-ntThere are several types of mint, each with its own subtle difference in flavour and appearance.… ",
        "description": "Mary Cadogan's aromatic broth will warm you up on a winter's evening - it contains ginger, which is particularly good for colds, too",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1035613_10.jpg?itok=KYNwhkXX"
    },
    {
        "name": "Greek salad",
        "ingredients": "4 large vine tomatoes, cut into irregular wedges, 1 cucumber, peeled, deseeded, then roughly chopped, ½ a red onion, thinly sliced, 16 Kalamata olives Olive ol-liv Widely grown all over the Mediterranean, where they've been cultivated since biblical times… , 1 tsp dried oregano Oregano or-ee-gar-noClosely related to marjoram, of which it is the wild equivalent, oregano has a coarser, more… , 85g feta cheese, cut into chunks (barrel matured feta is the best), 4 tbsp Greek extra virgin olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… ",
        "description": "Make a fresh and colourful Greek salad in no time. It's great with grilled meats at a barbecue, or on its own as a veggie main",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1201727_11.jpg?itok=Eafj5KWQ"
    },
    {
        "name": "Summer couscous salad",
        "ingredients": "250g couscous Couscous koos-koosConsisting of many tiny granules made from steamed and dried durum wheat, couscous has become a… , 250ml vegetable stock, boiling, 400g can chickpeas, drained and rinsed, 1-2 tbsp vegetable or olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 300g courgette, sliced on the slant Courgette corr-zjetThe courgette is a variety of cucurtbit, which means it's from the same family as cucumber,… , 300g small vine-ripened tomatoes, halved Tomato toe-mart-ohA member of the nightshade family (along with aubergines, peppers and chillies), tomatoes are in… , 250g pack halloumi cheese, thickly sliced and then halved lengthways, 125ml olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 3 tbsp lime juice, 2 large garlic cloves, finely chopped, 2 tbsp chopped fresh mint Mint mi-ntThere are several types of mint, each with its own subtle difference in flavour and appearance.… , ½ tsp sugar Sugar shuh-gaHoney and syrups made from concentrated fruit juice were the earliest known sweeteners. Today,… ",
        "description": "A Middle Eastern treat, ready in minutes",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--315542_12.jpg?itok=mvxVQelb"
    },
    {
        "name": "Courgette salad",
        "ingredients": "2 large courgettes Courgette corr-zjetThe courgette is a variety of cucurtbit, which means it's from the same family as cucumber,… , 3 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 1 tbsp lemon or lime juice, 1 tbsp clear honey, 2 tsp poppy seeds, 1 small garlic clove, crushed, salt and pepper, to taste Pepper pep-izAlso known as capsicums, bell peppers, sweet peppers or by their colours, for example red and… ",
        "description": "This courgette salad is the perfect barbecue accompaniment",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--4303_11.jpg?itok=K7i_jqAU"
    },
    {
        "name": "Couscous salad",
        "ingredients": "250g couscous Couscous koos-koosConsisting of many tiny granules made from steamed and dried durum wheat, couscous has become a… , ½ vegetable stock cube, knob butter (about 1 tbsp) Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 240g pack halloumi cheese, ½ 142ml tub natural yogurt, 1-2 tsp harissa paste, 200g can chickpeas, 2 roasted red peppers (from a jar is fine), 50g bag wild rocket Rocket roh-ketRocket is a very 'English' leaf, and has been used in salads since Elizabethan times. It… ",
        "description": "Four easy steps to a perfect summer salad",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--3125_12.jpg?itok=Mx_i5ior"
    },
    {
        "name": "Avocado salad",
        "ingredients": "4 Cos lettuce leaves, chopped, 6 cherry tomatoes, halved, 2 radishes, finely sliced Radish rad-ishThe root of a member of the mustard family, radishes have a peppery flavour and a crisp, crunchy… , 2 spring onions, finely sliced Spring onion sp-ring un-yunAlso known as scallions or green onions, spring onions are in fact very young onions, harvested… , 50g cucumber, cut into small cubes, 25g flat-leaf parsley leaves, chopped, 25g mint leaves, coarsely chopped Mint mi-ntThere are several types of mint, each with its own subtle difference in flavour and appearance.… , 1 avocado, chopped into chunky pieces Avocado av-oh-car-dohAlthough it's technically a fruit, the mild-flavoured avocado is used as a vegetable. Native… , ½ tbsp sumac (a crushed red, lemony berry; find it in Middle Eastern and Indian markets and online) Sumac soo-makThis wine-coloured ground spice is one of the most useful but least known and most… , ½ garlic clove, crushed, 1 tbsp lemon juice, 2 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… ",
        "description": "Try serving this superhealthy salad with crisp za'atar bread for a Middle Eastern feast",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--358479_12.jpg?itok=QRGYXgRn"
    },
    {
        "name": "Bitterleaf salad",
        "ingredients": "a large handful of frisée Frisée free-zayFrisée, also called curly endive, is a variety of chicory which is frequently used in mesclun (a… , a large handful of wild rocket Rocket roh-ketRocket is a very 'English' leaf, and has been used in salads since Elizabethan times. It… , a large handful of lamb's lettuce Lamb's lettuce lams lett-essSometimes known as Corn Salad, lamb's lettuce has long spoon-shaped dark leaves and a… , a large handful of radicchio leaves Radicchio rah-dee-chee-oAn Italian relative of chicory, radicchio is a forced crop and has distinctive red and white… , 4 tbsp extra-virgin olive oil, juice of 1 lemon Lemon le-monOval in shape, with a pronouced bulge on one end, lemons are one of the most versatile fruits… ",
        "description": "A simple salad dressed with good olive oil and lemon juice",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1765_12.jpg?itok=ZIGEqJhL"
    },
    {
        "name": "Garden salad",
        "ingredients": "2 heads lettuces, such as Cos or Butterhead Lettuce lett-issLettuce are available in a vast number of varieties, and are either crisp or floppy, growing… , 2 good handfuls of another salad leaf, such as watercress, rocket or mizuna, handful of soft herbs, such as chervil, tarragon, parsley, chives, 1 garlic clove, crushed, 1 spring onion, roughly chopped Spring onion sp-ring un-yunAlso known as scallions or green onions, spring onions are in fact very young onions, harvested… , handful parsley Parsley par-sleeOne of the most ubiquitous herbs in British cookery, parsley is also popular in European and… , a few watercress sprigs or rocket leaves Watercress wort-er-cressWith deep green leaves, and crisp, paler stems, watercress is related to mustard and is one of… , 2 tbsp white wine vinegar, ½ tsp Dijon mustard, 6 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… ",
        "description": "Crunchy, herby and fresh- this green side salad is versatile, healthy and dressed with a light garlic and parsley vinaigrette",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/garden-salad.jpg?itok=QU3qy4O8"
    },
    {
        "name": "Aubergine salad",
        "ingredients": "1 medium aubergine Aubergine oh-ber-geenAlthough it's technically a fruit (a berry, to be exact), the aubergine is used as a… , 1-2 spring onions, chopped Spring onion sp-ring un-yunAlso known as scallions or green onions, spring onions are in fact very young onions, harvested… , 4 cherry tomatoes, cut into quarters, ½ small red pepper, deseeded and finely diced, ½ small green pepper, deseeded and finely diced, 1 tbsp mint, chopped Mint mi-ntThere are several types of mint, each with its own subtle difference in flavour and appearance.… , seeds from ½ pomegranate, to serve Pomegranate pom-ee-gran-atNow mainly grown in America, Spain, the Middle East and India, pomegranates originated in the… , juice ½ lemon Lemon le-monOval in shape, with a pronouced bulge on one end, lemons are one of the most versatile fruits… , ½ small red chilli (deseeded if you don’t like it too hot), finely chopped (optional), ½ tbsp pomegranate molasses, 1 small garlic clove, crushed, 1½ tbsp extra virgin olive oil, plus extra to serve",
        "description": "This colourful Lebanese salad of roasted aubergine, peppers, pomegranate and a sweet and spicy dressing makes a mouth-watering treat for two",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/aubergine-salad.jpg?itok=L4fDAMd1"
    },
    {
        "name": "Cucumber salad",
        "ingredients": "350g natural whole-milk yogurt Yogurt yog-ertYogurt is made by adding a number of types of harmless bacteria to milk, causing it to ferment.… , 2 medium cucumber, peeled, deseeded and sliced, juice ½ lemon Lemon le-monOval in shape, with a pronouced bulge on one end, lemons are one of the most versatile fruits… , ½ tsp lightly crushed fennel seeds Fennel seeds feh-nell seedsA dried seed that comes from the fennel herb, fennel seeds look like cumin seeds, only greener,… , small bunch chopped mint Mint mi-ntThere are several types of mint, each with its own subtle difference in flavour and appearance.… , extra-virgin olive oil",
        "description": "A cooling raita-style yogurt dip with refreshing cucumber, mint, lemon and fennel seeds",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1308570_3.jpg?itok=OkRB6OT6"
    },
    {
        "name": "Pizza Margherita in 4 easy steps",
        "ingredients": "300g strong bread flour, 1 tsp instant yeast (from a sachet or a tub) Yeast yee-stYeast is a living, single-cell organism. As the yeast grows, it converts its food (in the form… , 1 tsp salt, 1 tbsp olive oil, plus extra for drizzling Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 100ml passata, handful fresh basil or 1 tsp dried Basil ba-zilMost closely associated with Mediterranean cooking but also very prevalent in Asian food, the… , 1 garlic clove, crushed, 125g ball mozzarella, sliced, handful grated or shaved parmesan (or vegetarian alternative) Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… , handful cherry tomatoes, halved, handful basil leaves (optional) Basil ba-zilMost closely associated with Mediterranean cooking but also very prevalent in Asian food, the… ",
        "description": "Even a novice cook can master the art of pizza with our simple step-by-step guide. Bellissimo",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--51643_11.jpg?itok=I_hF8vFL"
    },
    {
        "name": "Superhealthy pizza",
        "ingredients": "100g each strong white and strong wholewheat flour Flour fl-ow-erFlour is a powdery ingredient usually made from grinding wheat, maize, rye, barley or rice. As… , 1 tsp or 7g sachet easy-blend dried yeast Yeast yee-stYeast is a living, single-cell organism. As the yeast grows, it converts its food (in the form… , 125ml warm water, 200g can chopped tomato, juice drained, handful cherry tomatoes, halved, 1 large courgette, thinly sliced using a peeler Courgette corr-zjetThe courgette is a variety of cucurtbit, which means it's from the same family as cucumber,… , 25g mozzarella, torn into pieces, 1 tsp capers in brine, drained Capers kay-perCapers are the small flower buds of the Capparis shrub, which grows in the Mediterranean. As… , 8 green olives, roughly chopped Olive ol-liv Widely grown all over the Mediterranean, where they've been cultivated since biblical times… , 1 garlic clove, finely chopped, 1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 2 tbsp chopped parsley, to serve Parsley par-sleeOne of the most ubiquitous herbs in British cookery, parsley is also popular in European and… ",
        "description": "The quantities for this are generous, so if you have any leftovers, pop a wedge of cold pizza into your lunchbox the next day",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--193739_12.jpg?itok=cuLNDrcF"
    },
    {
        "name": "Florentine pizza",
        "ingredients": "30cm/12in bought pizza base, 6 rounded tbsp tomato sauce from a jar (we used Loyd Grossman's Tomato and Chilli), 175g washed spinach leaves Spinach spin-atchUsed in almost every cuisine across the world, spinach is an enormously popular green vegetable… , about a third or a 290g jar of antipasti mushrooms, 50g (or vegetarian alternative) parmesan, finely grated Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… , 4 medium eggs (large may overflow) Egg eggThe ultimate convenience food, eggs are powerhouses of nutrition, packed with protein and a… ",
        "description": "An easy vegetarian supper or a satisfying weekend lunch",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--4885_12.jpg?itok=pSWTOI2Q"
    },
    {
        "name": "Pizza omelette",
        "ingredients": "8 eggs, beaten Egg eggThe ultimate convenience food, eggs are powerhouses of nutrition, packed with protein and a… , 1 tsp oregano Oregano or-ee-gar-noClosely related to marjoram, of which it is the wild equivalent, oregano has a coarser, more… , 1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 4 tbsp tomato passata sauce (from a jar), handful of stoned black olives, 85g vegetarian cheddar, grated Cheddar Ched-ahOnce cheddar was 'Cheddar', a large, hard-pressed barrel of cheese made by a particular… ",
        "description": "This unusual combination is a real winner and is a great dish to cook with the kids",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--5282_11.jpg?itok=EWTKSzbo"
    },
    {
        "name": "Christmas pizza",
        "ingredients": "145g pizza base mix, 6 tbsp tomato pasta sauce, large handful (about 100g) leftover stuffing (a sausage stuffing works well for this), large handful (about 100g) leftover cooked turkey, shredded Turkey terk-eeWhile it's the traditional Christmas bird, turkey is good to eat all year round, though… , 100g mozzarella, sliced, small pack sage, leaves picked Sage sa-agePopular in both Italian and British cookery, sage has long, grey-green leaves with a slightly… , 1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… ",
        "description": "Use up leftover roast turkey and sausagemeat stuffing in this new spin on an Italian classic",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/pizza_2.jpg?itok=7uVYAWnq"
    },
    {
        "name": "Holiday pizzas",
        "ingredients": "500g strong white bread flour, plus extra for dusting, small pinch of sugar Sugar shuh-gaHoney and syrups made from concentrated fruit juice were the earliest known sweeteners. Today,… , 7g sachet fast-action dried yeast, 2 tbsp olive oil, plus extra for greasing Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 300ml warm water, 1 garlic clove, 400ml chunky passata, 1 tbsp tomato purée, 1 tsp dried oregano Oregano or-ee-gar-noClosely related to marjoram, of which it is the wild equivalent, oregano has a coarser, more… , handful basil leaves, snipped, small pinch of sugar Sugar shuh-gaHoney and syrups made from concentrated fruit juice were the earliest known sweeteners. Today,… , 1 tsp red wine vinegar, ham, red peppers, black olives, salami, mozzarella, cherry tomatoes, cheddar, tuna, sweetcorn, houmous and green salad, to serve",
        "description": "The latest in our cooking with kids series looks at kneading, rolling and sauce skills- then let your child build their own pizza from their favourite toppings",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/pizza_0.jpg?itok=NTUGkfHu"
    },
    {
        "name": "Pizza puff pinwheels",
        "ingredients": "375g pack ready rolled puff pastry, thawed if frozen, 6 tbsp ready made pasta sauce (not too chunky) Pasta pah-stahPasta is the Italian name for Italy's version of a basic foodstuff which is made in many… , 100g wafer thin ham, 100g mature cheddar, grated Cheddar Ched-ahOnce cheddar was 'Cheddar', a large, hard-pressed barrel of cheese made by a particular… , 1 egg, beaten Egg eggThe ultimate convenience food, eggs are powerhouses of nutrition, packed with protein and a… , 1 tsp dried oregano or mixed herbs Oregano or-ee-gar-noClosely related to marjoram, of which it is the wild equivalent, oregano has a coarser, more… ",
        "description": "Make the ideal supper treat for under 5's",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--964_11.jpg?itok=xWc0xc-f"
    },
    {
        "name": "Hot wings",
        "ingredients": "12 jumbo chicken wings, 280ml buttermilk Buttermilk buh-ter-mill-kThere are two types of buttermilk. Traditional buttermilk is a thin, cloudy, slightly tart but… , 75g cornflour, 1 tbsp smoked paprika, 1 tsp dried basil Basil ba-zilMost closely associated with Mediterranean cooking but also very prevalent in Asian food, the… , 1 tsp dried oregano Oregano or-ee-gar-noClosely related to marjoram, of which it is the wild equivalent, oregano has a coarser, more… , 1 tsp dried sage Sage sa-agePopular in both Italian and British cookery, sage has long, grey-green leaves with a slightly… , 2 tsp chilli powder, 2 tsp garlic powder, 2 tsp onion salt, ½ tsp ground white pepper, 100g honey Honey huh-neeHoney is made by bees from the nectar they collect from flowers. Viscous and fragrant, it's… , 1 tbsp soy sauce Soy sauce soy sor-sAn Asian condiment and ingredient that comes in a variety of of varieties ranging from light to… , 3 tbsp ketchup, 100ml sriracha, blue cheese dip, to serve (optional), see goes well with",
        "description": "Who doesn't love hot wings? They're the perfect help-yourself starter. These are roasted to give them that distinctive crunch and glazed with soy and Sriracha",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/04/toms-hot-wings.jpg?itok=NTTQHDNy"
    },
    {
        "name": "Hot & spicy wings with maple chipotle hot sauce",
        "ingredients": "1kg chicken wings, halved at the joint, wing tips removed and discarded, 1 tsp cayenne pepper, 1 tsp garlic granules, 1 tsp celery salt, 1 tsp golden caster sugar, 1 tsp mustard powder, 1 tbsp vegetable oil, 2 tbsp cider vinegar, 2 tsp smoked paprika, 1 tbsp Worcestershire sauce, 3 tbsp hot chilli sauce, 2 tbsp maple syrup Maple syrup may-pul sir-rupThe rising spring sap of a number of varieties of maple tree… , 1 tbsp chipotle paste",
        "description": "Spice rubs are the secret to mouth-watering barbecued meat, giving these sweet and sticky chicken wings extra crispy skin",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/hot-spicy-wings-with-maple-chipotle-hot-sauce.jpg?itok=nmDCEiOn"
    },
    {
        "name": "Chicken & mushroom hot-pot",
        "ingredients": "50g butter or margarine, plus extra for greasing Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 1 onion, chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 100g button mushrooms, sliced, 40g plain flour, 1 chicken stock cube or 500ml fresh chicken stock, pinch of nutmeg Nutmeg nut-megOne of the most useful of spices for both sweet and savoury… , pinch of mustard powder, 250g cooked chicken, chopped Chicken chik-enChicken's many plus points - its versatility, as well as the ease and speed with which it… , 2 handfuls of a mixed pack of sweetcorn, peas, broccoli and carrots, or pick your favourites Sweetcorn sw-eet cornAlso known as corn on the cob, sweetcorn is composed of rows of tightly packed golden yellow… , 2 large potatoes, sliced into rounds Potato po-tate-ohThe world's favourite root vegetable, the potato comes in innumerable varieties. A member of… , knob of butter, melted Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… ",
        "description": "Get the kids in the kitchen to help use up leftover cooked chicken in this hearty pie topped with slices of potato",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/chicken-mushroom-hot-pot.jpg?itok=W71GlROK"
    },
    {
        "name": "Hot diggedy dogs",
        "ingredients": "2 tbsp sunflower oil Sunflower oilA variety of oils can be used for baking. Sunflower is the one we use most often at Good Food as… , 6 large pork sausages Pork paw-kOne of the most versatile types of meat, pork is economical, tender if cooked correctly, and… , 1 large onion, sliced Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 1 tsp yellow mustard seeds Mustard muss-tardA condiment made by mixing the ground seeds of the mustard plant with a combination of… , 6 big flour tortillas Tortilla tor-tee-yaIn Spain, a tortilla is a kind of omelette, with ingredients added - frequently sliced cooked… , 2 tbsp tomato relish Tomato toe-mart-ohA member of the nightshade family (along with aubergines, peppers and chillies), tomatoes are in… , paper napkins, to serve",
        "description": "Bonfire night wouldn’t be complete without bangers - here, sausages and\nonion roast together in the oven",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--614_12.jpg?itok=-ueWZEOb"
    },
    {
        "name": "Hot beetroot salad",
        "ingredients": "3 raw beetroot, peeled and cut into matchsticks Beetroot beat-rootA favourite in 1970's British salads (served cooked and pickled in vinegar), beetroot is a… , juice 1 lemon Lemon le-monOval in shape, with a pronouced bulge on one end, lemons are one of the most versatile fruits… , 1 tbsp honey Honey huh-neeHoney is made by bees from the nectar they collect from flowers. Viscous and fragrant, it's… , 1 tbsp grainy mustard Mustard muss-tardA condiment made by mixing the ground seeds of the mustard plant with a combination of… ",
        "description": "Bursting with goodness, this vegetarian side dish is a great addition to a winter main",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--562483_12.jpg?itok=Rp8MFnMc"
    },
    {
        "name": "Meat fondue",
        "ingredients": "800g beef tenderloin or 4 rump steaks, cut into 1-inch cubes Beef bee-fThe classic cut of meat for a British Sunday roast, beef is full of flavour, as well as being a… , 1l good vegetable oil, crusty white bread, green salad",
        "description": "Revisit an 80s dinner party classic — the meat fondue. The assembly job can be done before your guests arrive. Make some sauces yourself and buy the rest",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/06/meat-fondue.jpg?itok=_xG7U5wo"
    },
    {
        "name": "Meat platter",
        "ingredients": "3 different types of salami, about 12 slices of each Salami sah-lah-meSalami are a family of coarse, dry, boldly seasoned sausages. The intense flavour of salami… , 6 thin slices of prosciutto Prosciutto proh-shoo-toeProsciutto is sweet, delicate ham intended to be eaten raw. The word 'prosciutto' is the… , black olives, Italian rustic bread, warmed, olive oil, to drizzle Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , cracked black pepper, to sprinkle Pepper pep-izAlso known as capsicums, bell peppers, sweet peppers or by their colours, for example red and… ",
        "description": "A traditional starter dish infused with the tastes of Italy - perfect with warmed bread",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1117_11.jpg?itok=4b3Z_w9P"
    },
    {
        "name": "More veg, less meat summer Bolognese",
        "ingredients": "2 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 2 onions, finely chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 3 carrots, finely chopped Carrot ka-rotThe carrot, with its distinctive bright orange colour, is one of the most versatile root… , 4 celery sticks, finely chopped Celery sell-er-eeA collection of long, thick, juicy stalks around a central, tender heart, celery ranges in… , 2 courgettes, cut into small cubes Courgette corr-zjetThe courgette is a variety of cucurtbit, which means it's from the same family as cucumber,… , 4 garlic cloves, finely chopped, 250g pack beef mince, 1 heaped tbsp tomato purée, 400g can chopped tomato, 400g fettuccine, 200g pea, frozen or fresh Peas p-eesA type of legume, peas grow inside long, plump pods. As is the case with all types of legume,… , handful parsley, roughly chopped Parsley par-sleeOne of the most ubiquitous herbs in British cookery, parsley is also popular in European and… ",
        "description": "Hide peas and courgettes in this Italian favourite to up your vegetable intake - great for kids when served with pasta",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1034456_11.jpg?itok=ZIe5FNhU"
    },
    {
        "name": "Mushroom & sausage pasta",
        "ingredients": "4 sausages, skin removed and meat squeezed out, 4 bacon rashers, diced Bacon bay-konBacon is pork that has been cured one of two ways: dry or wet. It can be bought as both rashers… , 200g mushrooms, chopped Mushroom mush-roomThe mushroom is a fungus which comes in a wide range of varieties that belong to two distinct… , 350g pasta shapes Pasta pah-stahPasta is the Italian name for Italy's version of a basic foodstuff which is made in many… , 50g parmesan, grated, plus extra shavings to serve Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… , 2 egg yolks, small bunch parsley, finely chopped Parsley par-sleeOne of the most ubiquitous herbs in British cookery, parsley is also popular in European and… , 2 tbsp half-fat crème fraîche",
        "description": "An easy pasta dish which will see you through many a midweek meal",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--625457_11.jpg?itok=JHLDQ5fM"
    },
    {
        "name": "Sausage & broccoli carbonara",
        "ingredients": "1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 8 chipolatas, meat squeezed out and rolled into balls, 3 eggs Egg eggThe ultimate convenience food, eggs are powerhouses of nutrition, packed with protein and a… , 50g parmesan, grated, plus extra to serve (optional) Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… , 300g spaghetti, 1 head broccoli, broken into small florets Broccoli brok-o-leeLike cabbage and cauliflower, broccoli is a brassica and is sometimes known by its Italian name… , 2 garlic cloves, crushed",
        "description": "A spin on the Italian classic using sausage meatballs, spaghetti and greens - on the table in half an hour",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1286451_7.jpg?itok=YKLJvGTB"
    },
    {
        "name": "Chicken quesadillas",
        "ingredients": "4 tbsp hot salsa from a jar, 2 large flour tortillas, seeded or plain Tortilla tor-tee-yaIn Spain, a tortilla is a kind of omelette, with ingredients added - frequently sliced cooked… , 215g can kidney bean, drained and roughly mashed Kidney beans kid-nee beenzNative to the Americas, kidney beans are so called because of their shape and come in very… , 1 spring onion, chopped Spring onion sp-ring un-yunAlso known as scallions or green onions, spring onions are in fact very young onions, harvested… , 50g leftover roast chicken, shredded (use the last of the meat on the carcass) Chicken chik-enChicken's many plus points - its versatility, as well as the ease and speed with which it… , 85g grated mature cheddar, ½ a 20g pack coriander, leaves chopped (optional), oil, for brushing",
        "description": "Frugal cooking, but packed with flavour - use up leftovers from roast chicken with these easy Mexican-style snacks",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--19637_11.jpg?itok=EA2pTIJf"
    },
    {
        "name": "Red rice & chicken salad with pomegranate & feta",
        "ingredients": "250g red Camargue rice Rice r-eye-sRice is a grain, the seed of a type of grass, which is the most widely grown and the most… , zest and juice 2 lemons Lemon le-monOval in shape, with a pronouced bulge on one end, lemons are one of the most versatile fruits… , 4 tbsp extra-virgin olive oil, pinch of caster sugar, 1 small ready-roasted chicken, skin discarded and meat shredded Chicken chik-enChicken's many plus points - its versatility, as well as the ease and speed with which it… , 50g almond, toasted and chopped Almond arr-mund or al-mundSweet almonds have a subtle fragrance that lends itself well to baking and also works well with… , 1 medium cucumber, deseeded, cut into diagonal chunky pieces, 1 bunch spring onions, chopped Spring onion sp-ring un-yunAlso known as scallions or green onions, spring onions are in fact very young onions, harvested… , 100g feta cheese, crumbled, 1 pomegranate, seeds removed Pomegranate pom-ee-gran-atNow mainly grown in America, Spain, the Middle East and India, pomegranates originated in the… , small handful dill, finely chopped",
        "description": "Use ready-roasted chicken to shred into your salad and pack up any leftovers for lunch the next day",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--703466_11.jpg?itok=i0XwrsFS"
    },
    {
        "name": "The great breakfast burger",
        "ingredients": "1 medium onion, roughly chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 2 tbsp tomato ketchup, 1 tbsp oyster sauce, 1kg sausagemeat, or meat squeezed from 16 large sausages, 1 egg yolk, 25g pack flat-leaf parsley, leaves chopped, 8 slices melting cheese (we used havarti), 8 grilled rashers streaky smoked bacon, 8 ciabatta buns, halved, tomato relish Tomato toe-mart-ohA member of the nightshade family (along with aubergines, peppers and chillies), tomatoes are in… ",
        "description": "Start the day with this flavour-packed breakfast sausage burger with bacon, cheese and tomato relish",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1075571_11.jpg?itok=cMxEmQHr"
    },
    {
        "name": "Creamy courgette & bacon pasta",
        "ingredients": "1 tsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 150g diced pancetta or smoked bacon lardons Pancetta pan-chet-ahPancetta is Italian cured pork belly - the equivalent of streaky bacon. It has a deep, strong,… , 4 courgettes, coarsely grated Courgette corr-zjetThe courgette is a variety of cucurtbit, which means it's from the same family as cucumber,… , 1 garlic clove, crushed, handful freshly grated parmesan Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… , 1 small tub (200g) low-fat crème fraîche, 300g tagliatelle",
        "description": "A quick and creamy carbonara-style tagliatelle that showcases delicious courgettes contrasted with cream and pancetta",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--991468_11.jpg?itok=bn__RDH5"
    },
    {
        "name": "Bacon & mushroom pasta",
        "ingredients": "400g penne (or other tube shape) pasta, 250g pack chestnut or button mushrooms, wiped clean, 8 rashers streaky bacon Bacon bay-konBacon is pork that has been cured one of two ways: dry or wet. It can be bought as both rashers… , 4 tbsp pesto (fresh from the chiller cabinet if possible) Pesto Pess-tohPesto is a generic Italian name for any sauce made by pounding ingredients together.The… , 200ml carton 50% fat crème fraîche, handful basil leaves",
        "description": "A simple one-pan pasta dish with bacon, mushrooms and pesto - ready in under 30 minutes",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--338805_11.jpg?itok=HOxbfk7V"
    },
    {
        "name": "Chunky sausage & tomato pasta",
        "ingredients": "1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 4 thick pork sausages, cut into bite-sized pieces, 2 garlic cloves, crushed, 200ml medium white wine, 1 tbsp tomato purée, 400g can chopped tomatoes Tomato toe-mart-ohA member of the nightshade family (along with aubergines, peppers and chillies), tomatoes are in… , 500g pack rigatoni or penne, handful basil leaves, torn, (optional), parmesan, to serve Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… ",
        "description": "Jazz up sausages with this spicy tomato pasta",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--338950_11.jpg?itok=uzab8n_G"
    },
    {
        "name": "Chicken & broccoli pasta bake",
        "ingredients": "350g pasta shells or quills Pasta pah-stahPasta is the Italian name for Italy's version of a basic foodstuff which is made in many… , 200g broccoli, cut into very small florets and the stems thinly sliced Broccoli brok-o-leeLike cabbage and cauliflower, broccoli is a brassica and is sometimes known by its Italian name… , 2 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 350g boneless, skinless chicken breasts, thinly sliced Chicken chik-enChicken's many plus points - its versatility, as well as the ease and speed with which it… , 175g chestnut mushrooms, quartered, 4 tbsp sundried tomato paste, 80g pkt soft cheese with garlic and herbs (such as Boursin), 284ml carton single cream, bunch of spring onions, finely sliced Spring onion sp-ring un-yunAlso known as scallions or green onions, spring onions are in fact very young onions, harvested… , 85g mature cheddar, grated, 1 garlic clove, finely chopped, 50g flaked almonds",
        "description": "This dish can be assembled ready for baking a good few hours ahead - and it's all cooked in one pan",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--52035_12.jpg?itok=BBzw46wU"
    },
    {
        "name": "Springtime pasta",
        "ingredients": "400g penne, 200g bag shredded kale Kale kay-elA member of the cabbage family, kale comes in two forms: kale, which has smooth leaves, and… , 100g streaky bacon, chopped, 1 medium red onion, finely sliced Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 100g soft mild goat's cheese, grated parmesan, to serve (optional) Parmesan parm-ee-zanParmesan is a straw-coloured hard cheese with a natural yellow rind and rich, fruity flavour. It… ",
        "description": "A hearty, rustic dish, ready for the table in 20 mins - try our ideas for using up the goat's cheese too",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--338621_12.jpg?itok=lykTjEX0"
    },
    {
        "name": "Eyeball pasta",
        "ingredients": "100g cherry tomato, 150g pack mini mozzarella balls, drained, handful basil Basil ba-zilMost closely associated with Mediterranean cooking but also very prevalent in Asian food, the… , 400g green tagliatelle, 350g jar tomato sauce, 4 tbsp fresh pesto Pesto Pess-tohPesto is a generic Italian name for any sauce made by pounding ingredients together.The… ",
        "description": "Get everyone in the Halloween mood with this gory but tasty pasta dish",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--51264_11.jpg?itok=Jo6C5pgP"
    },
    {
        "name": "Pasta primavera",
        "ingredients": "85g unsalted butter Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , 1½ tbsp each chopped parsley, mint and chives Parsley par-sleeOne of the most ubiquitous herbs in British cookery, parsley is also popular in European and… , 400g shelled garden peas, about 1¼kg/2lbs 12oz in their pods Peas p-eesA type of legume, peas grow inside long, plump pods. As is the case with all types of legume,… , 200g baby carrot, ideally with leaves Carrot ka-rotThe carrot, with its distinctive bright orange colour, is one of the most versatile root… , 200g baby or regular sized courgettes Courgette corr-zjetThe courgette is a variety of cucurtbit, which means it's from the same family as cucumber,… , 200g slim green beans, 400g tagliatelle, splash of olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , finely grated zest and juice of 1 lemon Lemon le-monOval in shape, with a pronouced bulge on one end, lemons are one of the most versatile fruits… , as much fresh basil as you like Basil ba-zilMost closely associated with Mediterranean cooking but also very prevalent in Asian food, the… ",
        "description": "Use fresh garden peas in this pasta primavera for a simple, colourful seasonal dish",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1640_11.jpg?itok=uIw7ipYN"
    },
    {
        "name": "Beer tiramisu",
        "ingredients": "250g mascarpone, 1 tsp vanilla extract, 330ml bottle of Wildebeest wild beer (or a coffee imperial stout), 150ml single cream, 4 tbsp icing sugar, 16 sponge fingers, good-quality dark chocolate and cocoa powder, to serve Dark chocolate dahk chok-o-letDark chocolate means the shiny, dark-reddish brown treat produced from the cacao bean, theobroma… ",
        "description": "Beer lovers everywhere rejoice – this twist on the tiramisu combines beer alongside layers of sponge and cream. Enjoy this spin on a classic pud",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2018/04/beerimisu.jpg?itok=BZQefRQX"
    },
    {
        "name": "Jamaican ginger beer & pineapple bundt cake",
        "ingredients": "225ml vegetable oil, plus extra for greasing, 75ml full-fat milk, 3 tbsp molasses Molasses moh-lassizMore commonly known as treacle or black treacle or, in the US as blackstrap molasses, molasses… , 375g plain flour, 1 tbsp baking powder Baking powder bay-king pow-dahBaking powder is a raising agent that is commonly used in cake-making. It is made from an alkali… , 1 tsp bicarbonate of soda Bicarbonate of sodaBicarbonate of soda, or baking soda, is an alkali which is used to raise soda breads and full-… , 300g dark muscovado sugar, 1 ½ tsp ground ginger, 1 tsp ground cinnamon, ½ tsp ground allspice, 300ml buttermilk Buttermilk buh-ter-mill-kThere are two types of buttermilk. Traditional buttermilk is a thin, cloudy, slightly tart but… , 100ml ginger beer (we used Old Jamaica), 3 large eggs, 227g can pineapple rings in juice, drained and chopped into small chunks (reserve the juice for the glaze), 4 tbsp liquid molasses Molasses moh-lassizMore commonly known as treacle or black treacle or, in the US as blackstrap molasses, molasses… , 200g icing sugar, pineapple juice (from above), 5 rings of dried or glacé pineapple Pineapple pine-ap-pelWith its tuft of spiky, dusty green leaves and cross-hatched, golden orange skin, the pineapple… , crystallised ginger, to decorate",
        "description": "This sticky ginger cake has a fantastic open texture, ready to absorb the molasses glaze. Serve as an alternative to Christmas cake or warm with cream",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/10/jamaican-ginger-beer-bundt.jpg?itok=tG2HL7N0"
    },
    {
        "name": "Avocado & strawberry smoothie",
        "ingredients": "½ avocado, stoned, peeled and cut into chunks Avocado av-oh-car-dohAlthough it's technically a fruit, the mild-flavoured avocado is used as a vegetable. Native… , 150g strawberry, halved Strawberry straw-bare-eeOnce available in Britain for just a brief period during the summer, strawberries are now a year… , 4 tbsp low-fat natural yogurt, 200ml semi-skimmed milk, lemon or lime juice, to taste, honey, to taste Honey huh-neeHoney is made by bees from the nectar they collect from flowers. Viscous and fragrant, it's… ",
        "description": "A creamy breakfast-friendly blend that's high in calcium and low in calories",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/berry-smoothie.jpg?itok=KgyfdWkH"
    },
    {
        "name": "Cranberry vodka",
        "ingredients": "250g fresh or frozen cranberries or other berries CranberryA tart, ruby-red coloured berry which grows wild on shrubs throughout northern Europe and North… , 1l bottle vodka Vodka vod-kaOriginally associated with Russia, Slavonic, Baltic and Scandinavian countries, vodka has become… , 175g caster sugar",
        "description": "This bittersweet fruity vodka is best served well chilled in shot glasses. It can also be made with other berries like blackcurrants or strawberries.",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--559673_11.jpg?itok=K38k4QBh"
    },
    {
        "name": "Rhubarb gin",
        "ingredients": "1kg pink rhubarb stalks Rhubarb roo-barbBotanically, rhubarb is a vegetable (it's related to sorrel and dock) but its thick, fleshy… , 400g caster sugar (don't use golden - it muddies the colour), 800ml gin Gin jinnLike all safe alcoholic drinks, gin is based on ethanol, an intoxicating liquid chemical that… ",
        "description": "Use seasonal rhubarb to make a G&T with a difference, or top with soda water for a refreshing summertime drink in glorious pink",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/04/rhubarb-gin.jpg?itok=zbAvKDzl"
    },
    {
        "name": "Vodka & cranberry blush",
        "ingredients": "200ml/7fl oz each vodka and Cointreau Vodka vod-kaOriginally associated with Russia, Slavonic, Baltic and Scandinavian countries, vodka has become… , 600ml cranberry juice, 400ml orange juice, strips of peel from 2-3 limes Lime ly-mThe same shape, but smaller than… , crushed ice, to serve",
        "description": "A sophisticated dinner party cocktail with a crisp cranberry kick",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--424782_11.jpg?itok=NjQAm7-M"
    },
    {
        "name": "Green breakfast smoothie",
        "ingredients": "1 handful spinach (about 50g/2oz), roughly chopped Spinach spin-atchUsed in almost every cuisine across the world, spinach is an enormously popular green vegetable… , 100g broccoli florets, roughly chopped Broccoli brok-o-leeLike cabbage and cauliflower, broccoli is a brassica and is sometimes known by its Italian name… , 2 celery sticks Celery sell-er-eeA collection of long, thick, juicy stalks around a central, tender heart, celery ranges in… , 4 tbsp desiccated coconut, 1 banana Banana bah-nah-nahProbably the best known, most popular tropical fruit, their name probably derives from the… , 300ml rice milk (good dairy alternative - we used one from Rude Health), ¼ tsp spirulina or 1 scoop of greens powder or vegan protein powder (optional) Spirulina spih-ruh-leenahSpirulina is a freshwater algae or seaweed that grows naturally in tropical and sub-tropical… ",
        "description": "Blitz healthy ingredients for an energy-boosting breakfast. Using unsweetened brown rice milk fortified with calcium and vitamins makes it more nutritious",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/green-breakfast-smoothie.jpg?itok=_GSLCCLt"
    },
    {
        "name": "Minced lamb filo tarts",
        "ingredients": "1 tbsp olive oil Olive oil ol-iv oylProbably the most widely-used oil in cooking, olive oil is pressed from fresh olives. It's… , 1 small onion, finely chopped Onion un-yunOnions are endlessly versatile and an essential ingredient in countless recipes. Native to Asia… , 1 tsp each ground cumin and cinnamon Cinnamon sin-ah-munA fragrant spice which comes from the inner bark of a tropical tree. When dried, it curls into… , 2 tsp ground ginger, ¼ tsp Chinese five-spice powder, 2 garlic cloves, finely chopped, 250g minced lamb, 125ml vegetable stock, 1 tbsp tomato purée, 3 sheets filo pastry, 50g butter, melted Butter butt-errButter is made when lactic-acid producing bacteria are added to cream and churned to make an… , natural yogurt and chopped coriander, to serve",
        "description": "Good Food reader Steve Tyson sent in this recipe which combines spices and lamb with inspired results",
        "img": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--613607_10.jpg?itok=tabfkb0-"
    }
]
